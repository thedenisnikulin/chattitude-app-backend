"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Methods = void 0;
const express_1 = require("express");
var Methods;
(function (Methods) {
    Methods["GET"] = "GET";
    Methods["POST"] = "POST";
    Methods["PUT"] = "PUT";
    Methods["DELETE"] = "DELETE";
})(Methods = exports.Methods || (exports.Methods = {}));
;
;
class Controller {
    constructor() {
        this.router = express_1.Router();
        this.routes = [];
        this.setRoutes = () => {
            for (const route of this.routes) {
                for (const mw of route.localMiddleware) {
                    this.router.use(route.path, mw);
                }
                ;
                switch (route.method) {
                    case 'GET':
                        this.router.get(route.path, route.handler);
                        break;
                    case 'POST':
                        this.router.post(route.path, route.handler);
                        break;
                    case 'PUT':
                        this.router.put(route.path, route.handler);
                        break;
                    case 'DELETE':
                        this.router.delete(route.path, route.handler);
                        break;
                    default:
                        console.log('not a valid method');
                        break;
                }
                ;
            }
            ;
            return this.router;
        };
    }
    // these methods below must not be a properties< but methods (no "=>")
    sendSuccess(res, data, message) {
        return res.status(200).json({
            message: message || 'success',
            data: data
        });
    }
    ;
    sendError(res, message) {
        return res.status(500).json({
            message: message || 'internal server error',
        });
    }
    ;
}
exports.default = Controller;
;
