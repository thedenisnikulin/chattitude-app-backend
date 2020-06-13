import { Sequelize } from 'sequelize';
import { IUser, UserModelStatic, getUser } from './UserModel';
import { IRoom, RoomModelStatic, getRoom } from './RoomModel';
import { IChatMessage, ChatMessageModelStatic, getChatMessage } from './ChatMessageModel';
import { DB, DB_USERNAME, DB_PASSWORD, DB_HOST } from "../config";

// ModelStatic provides a control logic for the model
// IModel provides an interface to model's instance

interface IDatabase {
    sequelize: Sequelize;
    User: UserModelStatic;
    Room: RoomModelStatic;
    ChatMessage: ChatMessageModelStatic
};

const sequelize = new Sequelize(
    DB, 
    DB_USERNAME, 
    DB_PASSWORD, {
      host: DB_HOST,
      dialect: 'postgres',
      pool: {
        max: 9,
        min: 0,
        idle: 10000
      }
  }
);

// Models
const User = getUser(sequelize);
const Room = getRoom(sequelize);
const ChatMessage = getChatMessage(sequelize);

// Associations
Room.hasMany(User, { foreignKey: 'roomId' });
Room.hasMany(ChatMessage, { foreignKey: 'roomId' });
User.hasMany(ChatMessage, { foreignKey: 'senderId' });
ChatMessage.belongsTo(User);
ChatMessage.belongsTo(Room);

const db: IDatabase = {
  sequelize,
  User,
  Room,
  ChatMessage
};

db.sequelize.sync()
  .then(() => console.log('Database & tables synced'))
  .catch(e => console.log(e));

export default db;
export type UserModel = IUser;
export type RoomModel = IRoom;
export type ChatMessageModel = IChatMessage;