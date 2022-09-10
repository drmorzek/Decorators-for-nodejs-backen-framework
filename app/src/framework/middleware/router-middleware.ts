import compose from "../lib/compose";

const METHODS = [
	'get',
	'post',
	'put',
	'delete'
]

interface IMethods {
	[key: string]: Function
};

interface IRoutes {
	[key: string]: any
};

interface IParams {
	[key: string]: any
};

export default class Router {
	private routes: IRoutes;

	constructor() {
		this.routes = {}
		const methods: IMethods = {}
		for (const method of METHODS) {
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

	private find(path: string , routes: IRoutes) {
		let pattern = new RegExp('\{(.*)\}');
		for (let route in routes) {
			if (route.match(pattern)) {

				let route_splitter = route.split('/') 
				let path_splitter = path.split('/')

				if (route_splitter.length === path_splitter.length) {
					let parameters: IParams = {};
					for (let i = 0; i < route_splitter.length; i++) {

						let route_match = route_splitter[i].match(pattern)

						if (route_match) {
							let param: string = route_match.pop() as string
							parameters[param] = path_splitter[i];
						} else if (route_splitter[i] === path_splitter[i]) {
							continue;
						} else {
							break;
						}
					}
					if (Object.keys(parameters).length) {
						return {
							route: routes[route_splitter.join('/')],
							data: parameters
						}
					}
				}
			} else if (path === route) {
				return {
					route: routes[route],
					data: false
				}
			}
		}
		return {
			route: false,
			data: false
		};
	}

	Middleware() {
		return (ctx: { params?: any; body?: any; status?: any; path?: any; method?: any; }, next: any) => {
			const { path, method } = ctx

			const { route, data } = this.find(path, this.routes)

			if (!!data) {
				ctx.params = data
			}

			if (!route) {
				ctx.body = { message: 'Not Found' }
				ctx.status = 404
				return Promise.resolve()
			}
			if (!route[method]) {
				ctx.body = { message: 'Method not supported' }
				ctx.status = 405
				return Promise.resolve()
			}
			return route[method](ctx, next)
		}
	}
}
