"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const UserModel_1 = require("./UserModel");
const RoomModel_1 = require("./RoomModel");
const ChatMessageModel_1 = require("./ChatMessageModel");
const config_1 = require("../config");
;
console.log("DATABAAAAAAAAASEEEEE " + config_1.DATABASE_URL);
const sequelize = new sequelize_1.Sequelize(config_1.DATABASE_URL, {
    dialect: 'postgres',
    pool: {
        max: 9,
        min: 0,
        idle: 10000
    }
});
// Models
const User = UserModel_1.getUser(sequelize);
const Room = RoomModel_1.getRoom(sequelize);
const ChatMessage = ChatMessageModel_1.getChatMessage(sequelize);
// Associations
Room.hasMany(User, { foreignKey: 'roomId' });
Room.hasMany(ChatMessage, { foreignKey: 'roomId' });
User.hasMany(ChatMessage, { foreignKey: 'senderId' });
ChatMessage.belongsTo(User);
ChatMessage.belongsTo(Room);
const db = {
    sequelize,
    User,
    Room,
    ChatMessage
};
db.sequelize.sync()
    .then(() => console.log('Database & tables synced'))
    .catch(e => console.log(e));
exports.default = db;
