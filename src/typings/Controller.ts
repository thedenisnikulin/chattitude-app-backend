import { Response, Request, NextFunction, Router } from 'express';

export enum Methods {
    ALL = 'all',
    GET = 'get',
    POST = 'post',
    PUT = 'put',
    DELETE = 'delete',
    PATCH = 'patch',
    OPTIONS = 'options',
    HEAD = 'head',
}

interface IRoute {
    path: string;
    method: Methods;
    handler: (
        req: Request,
        res: Response,
        next: NextFunction
    ) => void | Promise<void>;
    localMiddleware: ((
        req: Request,
        res: Response,
        next: NextFunction
    ) => void)[];
}

export default abstract class Controller {
    public router: Router = Router();
    public abstract path: string;
    protected abstract readonly routes: Array<IRoute>;

    public setRoutes = (): Router => {
        for (const route of this.routes) {
            try {
                for (const mw of route.localMiddleware) {
                    this.router[route.method](route.path, mw);
                }

                this.router[route.method](route.path, route.handler);
            } catch (err) {
                console.error('not a valid method');
            }
        }

        return this.router;
    };
    // these methods below must not be a properties< but methods (no "=>")
    protected sendSuccess(
        res: Response,
        data: object,
        message?: string
    ): Response {
        return res.status(200).json({
            message: message || 'success',
            data: data,
        });
    }

    protected sendError(res: Response, message?: string): Response {
        return res.status(500).json({
            message: message || 'internal server error',
        });
    }
}
