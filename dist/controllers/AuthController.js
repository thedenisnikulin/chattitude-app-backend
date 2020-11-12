"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const Controller_1 = __importStar(require("../typings/Controller"));
const UserService_1 = __importDefault(require("../services/UserService"));
class AuthController extends Controller_1.default {
    constructor() {
        super();
        this.path = '/';
        this.routes = [
            {
                path: '/login',
                method: Controller_1.Methods.POST,
                handler: this.handleLogin,
                localMiddleware: []
            },
            {
                path: '/register',
                method: Controller_1.Methods.POST,
                handler: this.handleRegister,
                localMiddleware: []
            }
        ];
    }
    ;
    handleLogin(req, res, next) {
        const _super = Object.create(null, {
            sendSuccess: { get: () => super.sendSuccess },
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const userService = new UserService_1.default(username, password);
                const data = yield userService.login();
                if (data.success) {
                    _super.sendSuccess.call(this, res, data.data, data.message);
                }
                else {
                    _super.sendError.call(this, res, data.message);
                }
            }
            catch (e) {
                console.log(e);
                _super.sendError.call(this, res);
            }
        });
    }
    ;
    handleRegister(req, res, next) {
        const _super = Object.create(null, {
            sendSuccess: { get: () => super.sendSuccess },
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password, bio } = req.body;
                const userService = new UserService_1.default(username, password, bio);
                const data = yield userService.register();
                if (data.success) {
                    _super.sendSuccess.call(this, res, data.data, data.message);
                }
                else {
                    _super.sendError.call(this, res, data.message);
                }
                ;
            }
            catch (e) {
                console.log(e);
                _super.sendError.call(this, res);
            }
        });
    }
    ;
}
exports.default = AuthController;
