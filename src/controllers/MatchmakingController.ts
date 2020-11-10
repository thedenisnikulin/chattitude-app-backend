import Controller, { Methods } from '../typings/Controller';
import Matchmaking from '../services/MatchmakingService';
import db from '../models/index';
// import { UserModel, RoomModel, ChatMessageModel } from '../models/index';
import { Request, Response, NextFunction } from 'express';
import Token from '../services/TokenService';

export default class MatchmakingController extends Controller {
    path: string = '/mm';
    routes = [
        {
            path: '/find-room',
            method: Methods.POST,
            handler: this.handleFindRoom,
            localMiddleware: [Token.verify]
        },
        {
            path: '/confirm-room-readiness',
            method: Methods.POST,
            handler: this.handleConfirmRoomReadiness,
            localMiddleware: [Token.verify]
        },
        {
            path: '/get-users-searching',
            method: Methods.GET,
            handler: this.handleGetUsersSearching,
            localMiddleware: [Token.verify]
        },
        {
            path: '/break-search',
            method: Methods.POST,
            handler: this.handleBreakSearch,
            localMiddleware: [Token.verify]
        }
    ];

    constructor() {
        super();
    };

    async handleFindRoom(req: Request, res: Response, next: NextFunction) {
        const { topic } = req.body;
        const user = await db.User.findOne({
            where: {
                username: req.verifiedUser.username
            }
        });
        const mm = new Matchmaking(user!, topic);
        try {
            const isRoomFound = await mm.findRoom();
            if (isRoomFound) {
                super.sendSuccess(res, { isRoomFound: true });
                return;
            } else {
                const isRoomCreated = await mm.createRoom();
                if (isRoomCreated) {
                    super.sendSuccess(res, { isRoomFound: true });
                    return;
                } else {
                    super.sendError(res);
                    throw('An error during creating room occured');
                }
            };
        } catch (e) {
            console.log(e);
            super.sendError(res);
            return;
        };
    };

    async handleConfirmRoomReadiness(req: Request, res: Response, next: NextFunction) {
        const { topic } = req.body;
        const user = await db.User.findOne({
            where: {
                username: req.verifiedUser.username
            }
        });
        const mm = new Matchmaking(user!, topic);
        try {
            const data = await mm.confirmRoomReadiness();
            super.sendSuccess(res, data);
        } catch(e) {
            console.log(e);
            super.sendError(res);
        };
    };

    async handleGetUsersSearching(req: Request, res: Response, next: NextFunction) {
        const usersSearching = await Matchmaking.getUsersSearching();
        super.sendSuccess(res, {usersSearching});
    };

    async handleBreakSearch(req: Request, res: Response, next: NextFunction) {
        const user = await db.User.findOne({
            where: {
                username: req.verifiedUser.username
            }   
        });
        try {
            await Matchmaking.breakSearch(user!);
        } catch(e) {
            console.log(e);
            super.sendError(res);
        }
    }
}