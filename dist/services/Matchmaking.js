"use strict";
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
const index_1 = __importDefault(require("../models/index"));
class Matchmaking {
    constructor(user, roomTopic) {
        this.user = user;
        this.roomTopic = roomTopic;
    }
    ;
    findRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield index_1.default.User.update({ isSearching: true }, { where: { id: this.user.id } });
                let foundRooms = yield index_1.default.Room.findAll({ include: [{ model: index_1.default.User }] });
                console.log('----START FINDING----');
                let breakLoop = false;
                for (let room of foundRooms) {
                    if (breakLoop)
                        break;
                    console.log('findRoom: found rooms count: ' + foundRooms.length);
                    console.log('findRoom: room id: ' + room.id);
                    console.log('findRoom: count users: ' + room.users.length);
                    if (room.topic === this.roomTopic && room.users.length < 4) {
                        breakLoop = true;
                        console.log('findRoom: got a match');
                        let updatedRoomUsers = room.users.push(this.user);
                        yield index_1.default.Room.update({ users: updatedRoomUsers }, { where: { id: room.id } });
                        yield index_1.default.User.update({ roomId: room.id }, { where: { id: this.user.id } });
                        return true;
                    }
                    ;
                }
                ;
                return false;
            }
            catch (e) {
                console.log(e);
                return false;
            }
        });
    }
    ;
    createRoom() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("NO ROOM FOUND");
            try {
                const r = yield index_1.default.Room.create({ include: [{ model: index_1.default.User }] });
                const room = yield index_1.default.Room.findOne({ where: { id: r.id }, include: [{ model: index_1.default.User }] });
                if (!r || !room) {
                    Promise.reject();
                    return false;
                }
                console.log('----START CREATION----');
                let updatedRoomUsers = room.users.push(this.user);
                yield index_1.default.Room.update({
                    topic: this.roomTopic,
                    users: updatedRoomUsers
                }, { where: { id: room.id } });
                return true;
            }
            catch (e) {
                console.log(e);
                return false;
            }
            ;
        });
    }
    ;
    confirmRoomReadiness() {
        return __awaiter(this, void 0, void 0, function* () {
            const room = yield index_1.default.Room.findOne({
                where: { id: this.user.roomId },
                include: [{ model: index_1.default.User }]
            });
            if (!room) {
                Promise.reject();
                return ({});
            }
            console.log('checkIfReady: room id: ' + room.id);
            console.log('checkIfReady: users in room count: ' + room.users.length);
            if (room.users.length === 4) {
                let usersToClient = [];
                room.users.forEach((user) => {
                    usersToClient.push({
                        id: user.id,
                        username: user.username,
                        bio: user.bio
                    });
                });
                console.log('checkIfReady: room\'s ready');
                console.log(usersToClient);
                const roomToClient = {
                    id: room.id,
                    topic: room.topic,
                    users: usersToClient
                };
                return ({
                    isRoomReady: true,
                    room: roomToClient
                });
            }
            else {
                console.log('checkIfReady: room\'s not ready');
                return ({ isRoomReady: false });
            }
        });
    }
    ;
    static getUsersSearching() {
        return __awaiter(this, void 0, void 0, function* () {
            const usersSearching = yield index_1.default.User.count({ where: { isSearching: true } });
            console.log('mm main: people searching: ' + usersSearching);
            return (usersSearching);
        });
    }
    ;
    breakSearch() {
        return __awaiter(this, void 0, void 0, function* () {
            yield index_1.default.User.update({
                isSearching: false,
                roomId: null
            }, { where: { id: this.user.id } });
        });
    }
}
exports.default = Matchmaking;
