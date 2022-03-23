export const Controller = (prefix: string = ''): ClassDecorator => {
  return (target: any) => {
    if (prefix == "/") prefix = ""
    Reflect.defineMetadata('prefix', prefix, target);

    if (! Reflect.hasMetadata('routes', target)) {
      Reflect.defineMetadata('routes', [], target);
    }

    if (! Reflect.hasMetadata('services', target)) {
      Reflect.defineMetadata('services', {}, target);
    }
  };
};
