"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// express
const express_1 = __importDefault(require("express"));
// important typings
const Server_1 = __importDefault(require("./typings/Server"));
const ChatServer_1 = __importDefault(require("./typings/ChatServer"));
const index_1 = __importDefault(require("./models/index"));
// controllers
const AuthController_1 = __importDefault(require("./controllers/AuthController"));
const TokenController_1 = __importDefault(require("./controllers/TokenController"));
const MatchmakingController_1 = __importDefault(require("./controllers/MatchmakingController"));
const RoomController_1 = __importDefault(require("./controllers/RoomController"));
// middleware
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
// utils
const config_1 = require("./config");
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const server = new Server_1.default(app, index_1.default.sequelize, config_1.PORT);
const controllers = [
    new AuthController_1.default(),
    new TokenController_1.default(),
    new MatchmakingController_1.default(),
    new RoomController_1.default()
];
const globalMiddleware = [
    body_parser_1.urlencoded({ extended: false }),
    body_parser_1.json(),
    cors_1.default({ credentials: true, origin: true }),
    express_1.default.static(path_1.default.join(__dirname, 'build'))
];
Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
    server.loadMiddleware(globalMiddleware);
    server.loadControllers(controllers);
    const httpServer = server.run();
    server.renderClient();
    const chatServer = new ChatServer_1.default(httpServer);
    chatServer.run();
});
