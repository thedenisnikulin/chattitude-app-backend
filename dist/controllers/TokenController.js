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
                controller: this.getToken,
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
