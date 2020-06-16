"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUser = void 0;
const sequelize_1 = require("sequelize");
;
function getUser(sequelize) {
    return sequelize.define('user', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        username: {
            type: sequelize_1.DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false,
        },
        bio: {
            type: sequelize_1.DataTypes.STRING,
        },
        rep: {
            type: sequelize_1.DataTypes.INTEGER,
            defaultValue: 1,
            allowNull: false,
        },
        isSearching: {
            type: sequelize_1.DataTypes.BOOLEAN,
            defaultValue: false
        },
        roomId: {
            type: sequelize_1.DataTypes.UUID
        }
    }, {
        freezeTableName: true
    });
}
exports.getUser = getUser;
;
