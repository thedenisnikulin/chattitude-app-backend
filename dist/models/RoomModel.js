"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
;
function getRoom(sequelize) {
    return sequelize.define('room', {
        id: {
            type: sequelize_1.DataTypes.UUID,
            defaultValue: sequelize_1.DataTypes.UUIDV4,
            primaryKey: true,
        },
        topic: {
            type: sequelize_1.DataTypes.STRING,
        }
    }, {
        freezeTableName: true
    });
}
exports.getRoom = getRoom;
;
