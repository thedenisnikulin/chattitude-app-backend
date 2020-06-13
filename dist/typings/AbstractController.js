"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
;
class AbstractController {
    constructor() {
        this.router = express_1.Router();
    }
    setRoutes() {
        for (const route of this.routes) {
            switch (route.method) {
                case 'GET':
                    this.router.get(route.path, route.controller);
                    break;
                case 'POST':
                    this.router.post(route.path, route.controller);
                    break;
                case 'PUT':
                    this.router.put(route.path, route.controller);
                    break;
                case 'DELETE':
                    this.router.delete(route.path, route.controller);
                    break;
            }
            ;
        }
        ;
        return this.router;
    }
    sendSuccess(res, data, message) {
        res.status(200).json({
            message: message || 'success',
            data: data
        });
    }
    ;
    sendError(res, message) {
        res.status(500).json({
            message: message || 'internal server error',
        });
    }
    ;
}
exports.default = AbstractController;
;
