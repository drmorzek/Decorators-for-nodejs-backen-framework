import 'reflect-metadata';
import Framework from "../src/Framework"
import Router from "../middleware/router-middleware"
import baseData from '../middleware/base-data';
import jsonBodyParser from '../middleware/json-body-parser';

export class Application {
    private middlewares: Function[] = []
    private controllers: Object[] = []

    globalMiddllewares(fns: Function[]) {
        fns.forEach((fn: Function) => { this.middlewares.push(fn) })
        return this
    }

    private _addControllers(controllers: Array<Object>) {
        controllers.forEach((obj: Object) => { this.controllers.push(obj) })
        return this
    }

    registerAppModule(modules: Array<Object>) {
        modules.forEach((obj: Object) => {
            const controllers = Reflect.getMetadata('controllers', obj);
            if (controllers && controllers.length !==0) {
                this._addControllers(controllers)
            }
        })
        return this
    }

    create() {
        const app = new Framework()
        const router = new Router()
        
        app.use(baseData)
        app.use(jsonBodyParser)

        for (const middleware of this.middlewares) {
            app.use(middleware)
        }

        app.use(router.Middleware())

        

        this.controllers.forEach((controller: any) => {

            const instance = new controller();

            const prefix = Reflect.getMetadata('prefix', controller);

            const routes = Reflect.getMetadata('routes', controller);

            const middlewares = Reflect.getMetadata('middlewares', controller) || [];

            routes.forEach((route: any) => {

                const requestMethod = route.requestMethod as keyof Router
                const classMethod = route.methodName
                const path = route.path as string
                Reflect.apply(
                    router[requestMethod],
                    undefined,
                    [
                        prefix + path,
                        ...middlewares,
                        (ctx: any) => {
                            Reflect.apply(instance[classMethod], instance, [ctx])
                        }
                    ]
                )
            });

        });

        return app
    }

    static init() {
        return new this()
    }
}