export const Route = (method: string,path?: string)=> {
  return (target: { constructor: Object; }, propertyKey: string): void => {

    if (!path || path == "/") path = ""
    
    if (! Reflect.hasMetadata('routes', target.constructor)) {
      Reflect.defineMetadata('routes', [], target.constructor);
    }

    const routes = Reflect.getMetadata('routes', target.constructor);

    routes.push({
      requestMethod: method,
      path,
      methodName: propertyKey
    });
    
    Reflect.defineMetadata('routes', routes, target.constructor);
  };
};
