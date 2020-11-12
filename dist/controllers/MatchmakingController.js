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
const MatchmakingService_1 = __importDefault(require("../services/MatchmakingService"));
const index_1 = __importDefault(require("../models/index"));
const TokenService_1 = __importDefault(require("../services/TokenService"));
class MatchmakingController extends Controller_1.default {
    constructor() {
        super();
        this.path = '/mm';
        this.routes = [
            {
                path: '/find-room',
                method: Controller_1.Methods.POST,
                handler: this.handleFindRoom,
                localMiddleware: [TokenService_1.default.verify]
            },
            {
                path: '/confirm-room-readiness',
                method: Controller_1.Methods.POST,
                handler: this.handleConfirmRoomReadiness,
                localMiddleware: [TokenService_1.default.verify]
            },
            {
                path: '/get-users-searching',
                method: Controller_1.Methods.GET,
                handler: this.handleGetUsersSearching,
                localMiddleware: [TokenService_1.default.verify]
            },
            {
                path: '/break-search',
                method: Controller_1.Methods.POST,
                handler: this.handleBreakSearch,
                localMiddleware: [TokenService_1.default.verify]
            }
        ];
    }
    ;
    handleFindRoom(req, res, next) {
        const _super = Object.create(null, {
            sendSuccess: { get: () => super.sendSuccess },
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { topic } = req.body;
            const user = yield index_1.default.User.findOne({
                where: {
                    username: req.verifiedUser.username
                }
            });
            const mm = new MatchmakingService_1.default(user, topic);
            try {
                const isRoomFound = yield mm.findRoom();
                if (isRoomFound) {
                    _super.sendSuccess.call(this, res, { isRoomFound: true });
                    return;
                }
                else {
                    const isRoomCreated = yield mm.createRoom();
                    if (isRoomCreated) {
                        _super.sendSuccess.call(this, res, { isRoomFound: true });
                        return;
                    }
                    else {
                        _super.sendError.call(this, res);
                        throw ('An error during creating room occured');
                    }
                }
                ;
            }
            catch (e) {
                console.log(e);
                _super.sendError.call(this, res);
                return;
            }
            ;
        });
    }
    ;
    handleConfirmRoomReadiness(req, res, next) {
        const _super = Object.create(null, {
            sendSuccess: { get: () => super.sendSuccess },
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const { topic } = req.body;
            const user = yield index_1.default.User.findOne({
                where: {
                    username: req.verifiedUser.username
                }
            });
            const mm = new MatchmakingService_1.default(user, topic);
            try {
                const data = yield mm.confirmRoomReadiness();
                _super.sendSuccess.call(this, res, data);
            }
            catch (e) {
                console.log(e);
                _super.sendError.call(this, res);
            }
            ;
        });
    }
    ;
    handleGetUsersSearching(req, res, next) {
        const _super = Object.create(null, {
            sendSuccess: { get: () => super.sendSuccess }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const usersSearching = yield MatchmakingService_1.default.getUsersSearching();
            _super.sendSuccess.call(this, res, { usersSearching });
        });
    }
    ;
    handleBreakSearch(req, res, next) {
        const _super = Object.create(null, {
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield index_1.default.User.findOne({
                where: {
                    username: req.verifiedUser.username
                }
            });
            try {
                yield MatchmakingService_1.default.breakSearch(user);
            }
            catch (e) {
                console.log(e);
                _super.sendError.call(this, res);
            }
        });
    }
}
exports.default = MatchmakingController;
