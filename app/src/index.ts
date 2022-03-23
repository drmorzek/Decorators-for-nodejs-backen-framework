import AppModule from "./app.module";
import { Application } from "./framework/factories/Application";
import TestController from "./modules/Test.controller";

const app = Application.init()
	.registerAppModule(AppModule)
	.globalMiddllewares([
		(ctx: any, next: () => void) => {
			ctx.r = 6
			console.log("global")
			next()
		}
	])
	.create()

app.listen(8080, () => {
	console.log('Started express on port 8080');
});
