import * as http from "http";
import compose from "../lib/compose";


export default class Framework {

	private middleware: Function[]

	constructor() {
		this.middleware = []
	}

	use(fn: Function) {
		this.middleware.push(fn)
	}

	listen(...args: any[]) {
		return http.createServer(this.handle()).listen(...args)
	}

	handle() {
		const fns = compose(this.middleware)
		return (req: any, res: { writeHead: (arg0: number, arg1: { 'Content-Type': string; }) => void; end: (arg0: string) => void; }) => {
			const ctx = { req, res }
			fns(ctx)
				.then(() => this.finishResponse(ctx))
				.catch((e) => {
					console.log(e)
					res.writeHead(500, { 'Content-Type': 'text/plain' })
					res.end('Error')
				})
		}
	}

	finishResponse(ctx: { req?: any; res: any; status?: any; contentType?: any; body?: any; }) {
		const { res, status = 200, contentType = 'application/json', body = '' } = ctx
		res.writeHead(status, { 'Content-Type': contentType })
		res.end(contentType === 'application/json' ? JSON.stringify(body) : body)
	}
}
