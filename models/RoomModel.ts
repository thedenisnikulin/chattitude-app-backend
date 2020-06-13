import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import { UserModelStatic, IUser } from './UserModel';
import { ChatMessageModelStatic, IChatMessage } from './ChatMessageModel';

export interface IRoom extends Model {
    readonly id: string;
    readonly topic: string;

    readonly createdAt: Date;
    readonly updatedAt: Date;

    readonly users: Array<IUser>;
    readonly chatMessages: Array<IChatMessage>
};

export type RoomModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IRoom;
};

export function getRoom(sequelize: Sequelize): RoomModelStatic {
    return <RoomModelStatic>sequelize.define('room', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        topic: {
            type: DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    })
};
