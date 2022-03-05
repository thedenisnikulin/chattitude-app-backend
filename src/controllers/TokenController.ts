import { Request, Response, NextFunction } from 'express';
import Controller, { Methods } from '../typings/Controller';
import Token from '../services/TokenService';

export default class TokenController extends Controller {
    path = '/';
    routes = [
        {
            path: '/token',
            method: Methods.POST,
            handler: this.getToken,
            localMiddleware: [Token.verify],
        },
    ];

    getToken(req: Request, res: Response, next: NextFunction): void {
        if (req.verifiedUser) {
            super.sendSuccess(res, {
                tokenVerificationData: { access: true, user: req.verifiedUser },
            });
        }
    }
}
