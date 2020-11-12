"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatMessage = void 0;
const sequelize_1 = require("sequelize");
;
function getChatMessage(sequelize) {
    return sequelize.define('chatMessage', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        message: {
            type: sequelize_1.DataTypes.STRING,
            allowNull: false
        },
        senderId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false
        },
        roomId: {
            type: sequelize_1.DataTypes.UUID,
            allowNull: false
        }
    }, {
        freezeTableName: true
    });
}
exports.getChatMessage = getChatMessage;
;
