import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { UserModelStatic } from './UserModel';
import { RoomModelStatic } from './RoomModel';

export interface IChatMessage extends Model {
    readonly id: string;
    readonly message: string;
    readonly senderId: string;
    readonly roomId: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly user: UserModelStatic;
    readonly room: RoomModelStatic;
};

export type ChatMessageModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IChatMessage;
};

export function getChatMessage(sequelize: Sequelize): ChatMessageModelStatic { 
    return <ChatMessageModelStatic>sequelize.define('chatMessage', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senderId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        roomId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        freezeTableName: true
    })
};