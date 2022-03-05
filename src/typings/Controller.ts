import { Response, Request, NextFunction, Router } from 'express';

export enum Methods {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
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
            for (const mw of route.localMiddleware) {
                this.router.use(route.path, mw);
            }
            switch (route.method) {
                case Methods.GET:
                    this.router.get(route.path, route.handler);
                    break;
                case Methods.POST:
                    this.router.post(route.path, route.handler);
                    break;
                case Methods.PUT:
                    this.router.put(route.path, route.handler);
                    break;
                case Methods.DELETE:
                    this.router.delete(route.path, route.handler);
                    break;
                default:
                    console.log('not a valid method');
                    break;
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
