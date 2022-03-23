import * as url from "url"

export default  (ctx: { path?: any; query?: any; method?: any; req?: any }, next: () => any) => {
	const { req } = ctx
	const { pathname, query } = url.parse(req.url, true)
	ctx.path = pathname
	ctx.query = query
	ctx.method = req.method.toLowerCase()
	return next()
}
