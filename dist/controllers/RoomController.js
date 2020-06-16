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
const TokenService_1 = __importDefault(require("../services/TokenService"));
const index_1 = __importDefault(require("../models/index"));
class RoomController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.path = '/room';
        this.routes = [
            {
                path: '/add-rep',
                method: Controller_1.Methods.POST,
                controller: this.handleAddRep,
                localMiddleware: [TokenService_1.default.verify]
            }
        ];
    }
    handleAddRep(req, res, next) {
        const _super = Object.create(null, {
            sendError: { get: () => super.sendError }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { valueToAdd, username } = req.body;
                console.log(valueToAdd, username);
                const user = yield index_1.default.User.findOne({ where: { username: username } });
                yield index_1.default.User.update({ rep: user.rep + valueToAdd }, { where: { username: username } });
            }
            catch (e) {
                console.log(e);
                _super.sendError.call(this, res);
            }
        });
    }
}
exports.default = RoomController;
