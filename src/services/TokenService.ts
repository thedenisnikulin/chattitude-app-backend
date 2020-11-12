import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { ISafeUser } from '../typings/index';
import { ACCESS_TOKEN_SECRET } from '../config'

export default class Token {
    public static verify(req: Request, res: Response, next: NextFunction): void {
        const header = req.headers.authorization;
        if (!header) {
            res.json({data: {tokenVerificationData:{ access: false, message: 'No token provided' }}});
            return;
        } else {
            const token = header.split(' ')[1];
            // console.log('tokenService token: ' + token);
            jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decodedFromToken) => {
                if (err) {
                    res.json({data: {tokenVerificationData: { access: false, message: 'Failed to verify token' }}});
                    return;
                } else {
                    // there's decodedFromToken.user that can only be reached with casting
                    // that's why it is wrapped in <{user: object}>
                    const decoded = <{user: object}>decodedFromToken;
                    const decodedUser = <ISafeUser>decoded.user;
                    // res.json({tokenVerificationData: { access: true, user: decodedUser } });
                    req.verifiedUser = decodedUser;
                    next();
                } 
            });
        }
    }
}
