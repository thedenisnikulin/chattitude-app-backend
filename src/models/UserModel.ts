import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';

export interface IUser extends Model {
    readonly id: string;
    readonly username: string;
    readonly password: string;
    readonly bio: string;
    readonly rep: number;
    readonly isSearching: boolean;
    readonly roomId: string | null;

    readonly createdAt: Date;
    readonly updatedAt: Date;
};

export type UserModelStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): IUser;
};

export function getUser(sequelize: Sequelize): UserModelStatic {
    return <UserModelStatic>sequelize.define('user', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING,
        },
        rep: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        isSearching: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        roomId: {
            type: DataTypes.UUID
        }
    }, {
        freezeTableName: true
    })
};