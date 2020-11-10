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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
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
                handler: this.handleAddRep,
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
