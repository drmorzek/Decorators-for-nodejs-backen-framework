class InjectorFactory {

    private static registry: {[key: string]: any} = {};

    private static _instance: InjectorFactory;

    public static get Instance()
    {
        return this._instance || (this._instance = new this());
    }

    getRegistered(key?: string): any {
        if(!key) {
            return InjectorFactory.registry
        }
        var registered = InjectorFactory.registry[key];
        if (registered) {
            return registered;
        } else {
            throw new Error(`Error: ${key} was not registered.`);
        }
    }

    register(key: string, value: any) {
        var registered = InjectorFactory.registry[key];
        if (registered) {
            return
        }
        InjectorFactory.registry[key] = value;
    }
}

export const Injector = InjectorFactory.Instance