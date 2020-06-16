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
const bcrypt = __importStar(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const index_1 = __importDefault(require("../models/index"));
class UserService {
    constructor(username, password, bio) {
        this.username = username;
        this.password = password;
        this.bio = bio;
    }
    login() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userFromDb = yield index_1.default.User.findOne({ where: { username: this.username } });
                if (userFromDb) {
                    console.log('password: ' + this.password);
                    const isPasswordEqual = yield bcrypt.compare(this.password, userFromDb.password);
                    console.log('password from db: ' + userFromDb.password);
                    if (isPasswordEqual) {
                        const data = this.prepareData(userFromDb);
                        return ({ message: 'Successfully logged in', success: true, data: data });
                    }
                    else {
                        return ({ message: 'Invalid password', success: false });
                    }
                    ;
                }
                else {
                    return ({ message: 'No such user', success: false });
                }
            }
            catch (e) {
                console.log(e);
                return ({ message: 'An error occured', success: false });
            }
        });
    }
    ;
    register() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.bio)
                return ({ message: 'No bio provided', success: false });
            try {
                const userFromDb = yield index_1.default.User.findOne({ where: { username: this.username } });
                if (!userFromDb) {
                    const hashedPassword = yield bcrypt.hash(this.password, 10);
                    const createdUser = yield index_1.default.User.create({
                        username: this.username,
                        password: hashedPassword,
                        bio: this.bio,
                    });
                    const data = this.prepareData(createdUser);
                    return ({ message: 'Successfully registered', success: true, data: data });
                }
                else {
                    return ({ message: 'User already exists', success: false });
                }
            }
            catch (e) {
                console.log(e);
                return ({ message: 'An error occured', success: false });
            }
        });
    }
    ;
    prepareData(user) {
        const token = jsonwebtoken_1.default.sign({ user }, 'process.env.ACCESS_TOKEN_SECRET', { expiresIn: '30d' });
        const data = {
            user: {
                id: user.id,
                username: user.username,
                bio: user.bio,
                roomId: user.roomId,
            },
            jwt: token
        };
        console.log(token);
        return data;
    }
}
exports.default = UserService;
