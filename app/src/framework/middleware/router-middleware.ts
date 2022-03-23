import compose from "../lib/compose";

interface IMethods {
	[key: string]: Function
  };
interface IRoutes {
	[key: string]: any
  };

export default  class Router {
	private routes: IRoutes;

	constructor() {
		this.routes = {}	
		const methods: IMethods = {}
		for (const method of  ['get', 'post', 'put', 'delete']) {
			methods[method] = (path: string, ...middleware: Function[]) => {
				const fns = compose(middleware)
				if (!this.routes[path]) {
					this.routes[path] = {}
				}
				this.routes[path][method] = fns
			}
		}
		Object.assign(Router.prototype, methods)
	}

	Middleware() {
		return (ctx: any, next: any) => {
			const { path, method } = ctx
			
			if (!this.routes[path]) {
				ctx.body = { message: 'Not Found' }
				ctx.status = 404
				return Promise.resolve()
			}
			if (!this.routes[path][method]) {
				ctx.body = { message: 'Method not supported' }
				ctx.status = 405
				return Promise.resolve()
			}
			return this.routes[path][method](ctx, next)
		}
	}
}
