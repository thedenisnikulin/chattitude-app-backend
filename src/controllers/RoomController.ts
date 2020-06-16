import { Request, Response, NextFunction } from 'express';
import Controller, { Methods } from '../typings/Controller';
import Token from '../services/TokenService';
import db from '../models/index';

export default class RoomController extends Controller {
    path = '/room';
    routes = [
        {
            path: '/add-rep',
            method: Methods.POST,
            controller: this.handleAddRep,
            localMiddleware: [Token.verify]
        }
    ];

    async handleAddRep(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { valueToAdd, username } = req.body;
            console.log(valueToAdd, username)
            const user = await db.User.findOne({ where: {username: username} });
            await db.User.update(
                { rep: user!.rep + valueToAdd },
                { where: { username: username } }
            );
        } catch(e) {
            console.log(e);
            super.sendError(res);
        }
    }
}