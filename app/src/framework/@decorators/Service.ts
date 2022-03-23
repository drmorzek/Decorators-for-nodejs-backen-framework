import { Injector } from "../factories/Injector";


export const Service = (key?: string) : ClassDecorator => {
  return (target: any) => {
   
    const instanse =  new target()
    Injector.register(key || target.name.toUpperCase(), instanse)
  };
};
