export default (ctx: any, next: () => any) => new Promise<void>((resolve) => {
	let buffer = ''
	ctx.req.on('data', (chunk: string) => buffer += chunk)
	ctx.req.on('end', () => {
		try {
			ctx.reqBody = JSON.parse(buffer)
		} catch(e) {
			ctx.reqBody = {}
		}
		resolve()
	})
}).then(() => next())
