declare global {
    namespace Express {
        interface Request {
            verifiedUser: ISafeUser;
        }
    }
}

export interface ISafeUser {
    id: string;
    username: string;
    bio: string;
    rep: number;
    roomId: string | null;
}

export interface ISafeRoom {
    id: string;
    topic: string;
    users: Array<ISafeUser>
}

export interface ISafeChatMessage {
    message: string;
    sender: ISafeUser;
}

// doc this later
export interface ISafeData {
    user?: ISafeUser;
    room?: ISafeRoom;
    jwt?: string;
    messages?: Array<ISafeChatMessage>
}