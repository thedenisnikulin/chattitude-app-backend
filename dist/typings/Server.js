"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
class Server {
    constructor(app, database, port) {
        this.app = app;
        this.database = database;
        this.port = port;
    }
    ;
    run() {
        return this.app.listen(this.port, () => {
            console.log(`The server is running on port ${this.port}`);
        });
    }
    ;
    loadMiddleware(middlewares) {
        middlewares.forEach(middleware => {
            this.app.use(middleware);
        });
    }
    ;
    loadControllers(controllers) {
        controllers.forEach(controller => {
            console.log('c inited');
            this.app.use(controller.path, controller.setRoutes());
        });
    }
    ;
    renderClient() {
        this.app.get('/*', (req, res) => {
            res.sendFile(path_1.default.join(__dirname, '../build/', 'index.html'));
        });
    }
    initDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.database.authenticate();
                console.log('Database is successfully authenticated');
            }
            catch (err) {
                console.log(err);
            }
            ;
        });
    }
}
exports.default = Server;
