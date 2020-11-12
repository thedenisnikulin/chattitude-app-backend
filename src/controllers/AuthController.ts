import Controller, { Methods } from '../typings/Controller';
import { Request, Response, NextFunction } from 'express';
import UserService from '../services/UserService';

export default class AuthController extends Controller {
    path = '/';
    routes = [
        {
            path: '/login',
            method: Methods.POST,
            handler: this.handleLogin,
            localMiddleware: []
        },
        {
            path: '/register',
            method: Methods.POST,
            handler: this.handleRegister,
            localMiddleware: []
        }
    ];

    constructor() {
        super();
    };

    async handleLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password } = req.body;
            const userService = new UserService(username, password);
            const data = await userService.login();
            if (data.success) {
                super.sendSuccess(res, data.data!, data.message);
            } else {
                super.sendError(res, data.message);
            }
        } catch(e) {
            console.log(e);
            super.sendError(res);
        }
    };

    async handleRegister(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { username, password, bio } = req.body;
            const userService = new UserService(username, password, bio);
            const data = await userService.register();
            if (data.success) {
                super.sendSuccess(res, data.data!, data.message);
            } else {
                super.sendError(res, data.message);
            };
        } catch(e) {
            console.log(e);
            super.sendError(res);
        }
    };
}
