"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Token {
    static verify(req, res, next) {
        const header = req.headers.authorization;
        console.log("header: " + header);
        if (!header) {
            res.json({ data: { tokenVerificationData: { access: false, message: 'No token provided' } } });
            return;
        }
        else {
            const token = header.split(' ')[1];
            // console.log('tokenService token: ' + token);
            jsonwebtoken_1.default.verify(token, 'process.env.ACCESS_TOKEN_SECRET', (err, decodedFromToken) => {
                if (err) {
                    res.json({ data: { tokenVerificationData: { access: false, message: 'Failed to verify token' } } });
                    return;
                }
                else {
                    // there's decodedFromToken.user that can only be reached with casting
                    // that's why it is wrapped in <{user: object}>
                    const decoded = decodedFromToken;
                    const decodedUser = decoded.user;
                    // res.json({tokenVerificationData: { access: true, user: decodedUser } });
                    req.verifiedUser = decodedUser;
                    next();
                }
            });
        }
    }
}
exports.default = Token;
