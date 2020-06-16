"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const io = __importStar(require("socket.io"));
const index_1 = __importDefault(require("../models/index"));
var Events;
(function (Events) {
    Events["CONNECTION"] = "connection";
    Events["INIT"] = "init";
    Events["MESSAGE"] = "message";
    Events["CONNECT_ROOM"] = "connectRoom";
    Events["DISCONNECT_ROOM"] = "disconnectRoom";
    Events["DISCONNECT_USER"] = "disconnectUser";
})(Events || (Events = {}));
;
class ChatServer {
    constructor(server) {
        this.roomId = '';
        this.server = server;
        this.io = io.listen(this.server);
    }
    ;
    run() {
        console.log('chat\'s here');
        this.io.on(Events.CONNECTION, (socket) => {
            socket.on(Events.INIT, () => __awaiter(this, void 0, void 0, function* () {
                console.log('SOCKET: init');
                const chatMessagesInRoom = yield index_1.default.ChatMessage.findAll({ where: { roomId: this.roomId } });
                const usersInRoom = yield index_1.default.User.findAll({ where: { roomId: this.roomId } });
                let data = { messages: [] };
                chatMessagesInRoom.map(msg => {
                    for (let i = 0; i < usersInRoom.length; i++) {
                        if (usersInRoom[i].id === msg.senderId) {
                            data.messages.push({
                                message: msg.message,
                                sender: {
                                    id: usersInRoom[i].username,
                                    username: usersInRoom[i].username,
                                    bio: usersInRoom[i].bio,
                                    rep: usersInRoom[i].rep,
                                    roomId: usersInRoom[i].roomId
                                }
                            });
                        }
                        ;
                    }
                    ;
                });
                // console.log('SOCKET: init messages ' + require('util').inspect(data.messages))
                console.log('SOCKET: users count ' + require('util').inspect(usersInRoom.length));
                socket.emit('init', { messages: data.messages });
            }));
            socket.on(Events.CONNECT_ROOM, (roomId) => {
                this.roomId = roomId;
                socket.join(roomId);
                console.log('SOCKET: connectRoom: roomId: ' + roomId);
            });
            socket.on(Events.DISCONNECT_ROOM, () => __awaiter(this, void 0, void 0, function* () {
                socket.removeAllListeners(this.roomId);
                yield index_1.default.ChatMessage.destroy({ where: { roomId: this.roomId } });
                yield index_1.default.Room.destroy({ where: { roomId: this.roomId } });
            }));
            socket.on(Events.DISCONNECT_USER, (username) => __awaiter(this, void 0, void 0, function* () {
                console.log(username + ' from disconnectUser ');
                yield index_1.default.User.update({ isSearching: false, roomId: null }, { where: { username } });
            }));
            socket.on(Events.MESSAGE, (msg) => __awaiter(this, void 0, void 0, function* () {
                yield index_1.default.ChatMessage.create({
                    message: msg.message,
                    senderId: msg.sender.id,
                    roomId: this.roomId
                });
                this.io.to(this.roomId).emit(Events.MESSAGE, {
                    message: msg.message,
                    sender: msg.sender
                });
            }));
        });
    }
    ;
}
exports.default = ChatServer;
ChatServer.PORT = 7000;
