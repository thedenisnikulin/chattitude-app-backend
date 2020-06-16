// express
import express, { Application, RequestHandler } from 'express';
// important typings
import Server from './typings/Server';
import ChatServer from './typings/ChatServer';
import Controller from './typings/Controller';
import db from './models/index';
// controllers
import AuthController from './controllers/AuthController';
import TokenController from './controllers/TokenController';
import MatchmakingController from './controllers/MatchmakingController';
import RoomController from './controllers/RoomController';
// middleware
import { json, urlencoded } from 'body-parser';
import cors from 'cors';
// utils
import { PORT } from "./config";
import path from "path";

const app: Application = express();
const server: Server = new Server(app, db.sequelize, PORT);

const controllers: Array<Controller> = [
    new AuthController(),
    new TokenController(),
    new MatchmakingController(),
    new RoomController()
];

const globalMiddleware: Array<RequestHandler> = [
    urlencoded({ extended: false }),
    json(),
    cors({ credentials: true, origin: true }),
    express.static(path.join(__dirname, '../client/build'))
];

Promise.resolve()
    .then(() => server.initDatabase())
    .then(() => {
        server.loadMiddleware(globalMiddleware);
        server.loadControllers(controllers);
        const httpServer = server.run();
        server.renderClient();
        const chatServer = new ChatServer(httpServer);
        chatServer.run();
    });