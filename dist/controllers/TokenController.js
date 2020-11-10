"use strict";
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
class TokenController extends Controller_1.default {
    constructor() {
        super(...arguments);
        this.path = '/';
        this.routes = [
            {
                path: '/token',
                method: Controller_1.Methods.POST,
                handler: this.getToken,
                localMiddleware: [TokenService_1.default.verify]
            }
        ];
    }
    getToken(req, res, next) {
        if (req.verifiedUser) {
            super.sendSuccess(res, { tokenVerificationData: { access: true, user: req.verifiedUser } });
        }
        ;
    }
}
exports.default = TokenController;
