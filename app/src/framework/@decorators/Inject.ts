import { Injector } from "../factories/Injector";

export const Inject = (name?: string) => {
    return (target: any, key: string) => {
        const services = Injector.getRegistered(name || key.toUpperCase())

        target[key] = services
    };
}