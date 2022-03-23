import "reflect-metadata"

export const Use = (usage: any) => {
  return (target: { constructor: Object; }, propertyKey: string): void => {

    if (!Reflect.hasMetadata('middlewares', target.constructor)) {
      Reflect.defineMetadata('middlewares', [], target.constructor);
    }

    const middwares = Reflect.getMetadata('middlewares', target.constructor);

    if (typeof usage == "function") {
      middwares.push(usage)
    }
    else if (Array.isArray(usage)) {
      usage.forEach(fn => { middwares.push(fn) })
    }


    Reflect.defineMetadata('middlewares', middwares, target.constructor);
  };
};
