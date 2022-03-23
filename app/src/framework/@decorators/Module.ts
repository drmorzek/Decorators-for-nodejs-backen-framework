export const Module = (obj: {
    controllers?: any[],
    middlewares?: any[],
    prefix?: string
}): ClassDecorator => {
    return (target: any) => {
        if (obj.prefix == "/" || !obj.prefix) obj.prefix = ""

        if (!Reflect.hasMetadata('prefix', target)) {
            Reflect.defineMetadata('prefix', obj.prefix, target);
        }

        if (!obj.controllers || obj.controllers.length == 0) {
            throw new Error(`Error: controllers is empty`)
        }

        if (!obj.middlewares || obj.middlewares.length == 0) {
            obj.middlewares = []
        }

        Reflect.defineMetadata('controllers', obj.controllers, target);

        if (obj.controllers) {
            for (const controller of obj.controllers) {
                if (!Reflect.hasMetadata('prefix', controller)) {
                    Reflect.defineMetadata('prefix', obj.prefix, controller);
                    continue
                }

                let prefix = Reflect.getMetadata('prefix', controller);
                prefix = obj.prefix + prefix
                Reflect.defineMetadata('prefix', prefix, controller);

                let middlewares = Reflect.getMetadata('middlewares', controller);
                middlewares = [...obj.middlewares, ...middlewares]
                Reflect.defineMetadata('middlewares', middlewares, controller);
            }
        }


    };
};