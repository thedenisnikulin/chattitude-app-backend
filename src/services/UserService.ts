import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/index'
import { ISafeData } from '../typings/index';
import { IUser } from '../models/UserModel';

interface AuthReturnData {
    message: string;
    success: boolean;
    data?: object;
}

export default class UserService {
    constructor(
        public readonly username: string,
        public readonly password: string,
        public readonly bio?: string
    ) {}

    public async login(): Promise<AuthReturnData> {
        try {
            const userFromDb = await db.User.findOne({ where: { username: this.username } });
            if (userFromDb) {
                console.log('password: ' + this.password)
                const isPasswordEqual = await bcrypt.compare(this.password, userFromDb.password);
                console.log('password from db: ' + userFromDb.password)
                if (isPasswordEqual) {
                    const data = this.prepareData(userFromDb);
                    return({ message: 'Successfully logged in', success: true, data: data })
                } else {
                    return({ message: 'Invalid password', success: false });
                };
            } else {
                return({ message: 'No such user', success: false });
            }
        } catch(e) {
            console.log(e);
            return({ message: 'An error occured', success: false });
        }
    };

    public async register(): Promise<AuthReturnData> {
        if (!this.bio) return({ message: 'No bio provided', success: false });
        try {
            const userFromDb = await db.User.findOne({ where: { username: this.username } });
            if (!userFromDb) {
                const hashedPassword = await bcrypt.hash(this.password, 10);
                const createdUser = await db.User.create({
                    username: this.username,
                    password: hashedPassword,
                    bio: this.bio,
                });
                const data = this.prepareData(createdUser);
                return({ message: 'Successfully registered', success: true, data: data })
            } else {
                return({ message: 'User already exists', success: false });
            }
        } catch (e) {
            console.log(e);
            return({ message: 'An error occured', success: false });
        }
    };

    private prepareData(user: IUser): ISafeData {
        const token = jwt.sign(
            { user },
            'process.env.ACCESS_TOKEN_SECRET',
            { expiresIn: '30d' }
        );
        const data: ISafeData = {
            user: {
                id: user.id,
                username: user.username,
                bio: user.bio,
                rep: user.rep,
                roomId: user.roomId,
            },
            jwt: token
        };
        console.log(token)
        return data;
    }
}