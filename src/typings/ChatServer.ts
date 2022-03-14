import * as io from 'socket.io';
import express, { Application } from 'express';
import http from 'http';
import db from '../models/index';
import { ISafeData, ISafeChatMessage } from './index';

enum Events {
    CONNECTION = 'connection',
    INIT = 'init',
    MESSAGE = 'message',
    CONNECT_ROOM = 'connectRoom',
    DISCONNECT_ROOM = 'disconnectRoom',
    DISCONNECT_USER = 'disconnectUser',
}

export default class ChatServer {
    public static readonly PORT: number = 7000;
    private server: http.Server;
    private io: SocketIO.Server;
    private roomId: string = '';

    constructor(server: http.Server) {
        this.server = server;
        this.io = io.listen(this.server);
    }

    public run(): void {
        console.log("chat's here");
        this.io.on(Events.CONNECTION, (socket: io.Socket) => {
            socket.on(Events.INIT, async () => {
                console.log('SOCKET: init');
                const chatMessagesInRoom = await db.ChatMessage.findAll({
                    where: { roomId: this.roomId },
                });
                const usersInRoom = await db.User.findAll({
                    where: { roomId: this.roomId },
                });

                let data: ISafeData = { messages: [] };

                chatMessagesInRoom.map((msg) => {
                    for (let i = 0; i < usersInRoom.length; i++) {
                        if (usersInRoom[i].id === msg.senderId) {
                            data.messages!.push({
                                message: msg.message,
                                sender: {
                                    id: usersInRoom[i].username,
                                    username: usersInRoom[i].username,
                                    bio: usersInRoom[i].bio,
                                    rep: usersInRoom[i].rep,
                                    roomId: usersInRoom[i].roomId,
                                },
                            });
                        }
                    }
                });
                // console.log('SOCKET: init messages ' + require('util').inspect(data.messages))
                console.log(
                    'SOCKET: users count ' +
                        require('util').inspect(usersInRoom.length)
                );
                socket.emit('init', { messages: data.messages });
            });
            socket.on(Events.CONNECT_ROOM, (roomId: string) => {
                this.roomId = roomId;
                socket.join(roomId);
                console.log('SOCKET: connectRoom: roomId: ' + roomId);
            });
            socket.on(Events.DISCONNECT_ROOM, async () => {
                socket.removeAllListeners(this.roomId);
                await db.ChatMessage.destroy({
                    where: { roomId: this.roomId },
                });
                await db.Room.destroy({ where: { roomId: this.roomId } });
            });
            socket.on(Events.DISCONNECT_USER, async (username: string) => {
                console.log(username + ' from disconnectUser ');
                await db.User.update(
                    { isSearching: false, roomId: null },
                    { where: { username } }
                );
            });
            socket.on(Events.MESSAGE, async (msg: ISafeChatMessage) => {
                await db.ChatMessage.create({
                    message: msg.message,
                    senderId: msg.sender.id,
                    roomId: this.roomId,
                });
                this.io.to(this.roomId).emit(Events.MESSAGE, {
                    message: msg.message,
                    sender: msg.sender,
                });
            });
        });
    }
}
