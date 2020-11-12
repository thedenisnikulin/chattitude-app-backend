import db from '../models/index';
import { UserModel, RoomModel } from '../models/index';
import { ISafeUser, ISafeRoom } from '../typings/index';

export default class Matchmaking {
    public user: UserModel;
    public roomTopic: string;

    constructor(user: UserModel, roomTopic: string) {
        this.user = user;
        this.roomTopic = roomTopic;
    };

    public async findRoom(): Promise<boolean> {
        try {
            await db.User.update(
                { isSearching: true },
                { where: { id: this.user.id } }
            );
            let foundRooms: Array<RoomModel> = await db.Room.findAll({ include: [{ model: db.User }] });
            console.log('----START FINDING----');
            let breakLoop: boolean = false;
            for (let i = 0; i < foundRooms.length; i++) {
                if (breakLoop) {
                    break
                };
                console.log('findRoom: room id: '+ foundRooms[i].id)
                console.log('findRoom: count users: '+ foundRooms[i].users.length)
                console.log('findRoom: topic: ' + foundRooms[i].topic);
                if (foundRooms[i].topic === this.roomTopic && foundRooms[i].users.length < 4) {
                    breakLoop = true;
                    console.log('findRoom: got a match');
                    let updatedRoomUsers = foundRooms[i].users.push(this.user);
                    await db.Room.update(
                        { users: updatedRoomUsers },
                        { where: { id: foundRooms[i].id } }
                    );+
                    await db.User.update(
                        { roomId: foundRooms[i].id },
                        { where: { id: this.user.id } }
                    );
                    return true;
                };
            };
            return false;
        } catch(e) {
            console.log(e);
            return false;
        }
    };

    public async createRoom(): Promise<boolean> {
        console.log("NO ROOM FOUND")
        try {
            const r = await db.Room.create({ include: [{ model: db.User }] });
            const room = await db.Room.findOne({ where: { id: r.id }, include: [{ model: db.User }] });
            if (!r || !room) {
                Promise.reject();
                return false;
            }
            let updatedRoomUsers = room.users.push(this.user);
            await db.Room.update({
                    topic: this.roomTopic,
                    users: updatedRoomUsers
                },
                { where: { id: room.id } }
            );
            return true;
        } catch(e) {
            console.log(e);
            return false;
        };
    };

    public async confirmRoomReadiness(): Promise<object> {
        const room = await db.Room.findOne({
            where: { id: this.user.roomId },
            include: [{ model: db.User }]
        });
        if (!room) {
            console.log('rejected')
            Promise.reject();
            return({});
        }
        console.log('checkIfReady: room id: ' + room.id);
        console.log('checkIfReady: users in room count: ' + room.users.length);
        if (room.users.length === 4) {
            let usersToClient: ISafeUser[] = [];
            room.users.forEach((user: UserModel)=> {
                usersToClient.push({
                    id: user.id,
                    username: user.username,
                    bio: user.bio,
                    rep: user.rep,
                    roomId: user.roomId || null
                });
            });
            console.log('checkIfReady: room\'s ready')
            console.log(usersToClient)
            const roomToClient: ISafeRoom = {
                id: room.id, 
                topic: room.topic, 
                users: usersToClient 
            };
            return({
                isRoomReady: true,
                room: roomToClient
            });
        } else {
            console.log('checkIfReady: room\'s not ready')
            return({ isRoomReady: false });
        }
    };

    public static async getUsersSearching(): Promise<number> {
        const usersSearching = await db.User.count({ where: { isSearching: true } });
        console.log('mm main: people searching: ' + usersSearching)
        return(usersSearching)
    };
    
    public static async breakSearch(user: UserModel): Promise<void> {
        await db.User.update(
            {
                isSearching: false,
                roomId: null
            },
            { where: { id: user.id } }
        );
    };
}
