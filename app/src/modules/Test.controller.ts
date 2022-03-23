import { Controller, Get, Inject, Post, Use } from "../framework/@decorators";
import TestService from "./Test.service";

const controllermiddleware = (ctx: any, next: () => void) => {
  ctx.rd = 6
  console.log("controllermiddleware")
  next()
}

@Controller('/')
export default class TestController {

  @Inject()
  private testservice!: TestService;

  @Get("/")
  @Use([
    controllermiddleware,
    (ctx: any, next: () => void) => {
			ctx.rd = 6
      console.log("routemiddleware")
			next()
		}
  ])
  public index(ctx: { body: any; r: number; rd: number;}) {
    ctx.body = {
      middlewareglobaltest: ctx.r,
      middlewareusetest: ctx.rd,
      servicetest: this.testservice.test()
    };
  }

  @Post('/')
  public post(ctx: { body: string; }) {
    ctx.body = "Hii";
  }

  @Get('/get-message')
  public details(ctx: { status: number; body: { message: any; }; reqBody: any; }) {
    ctx.status = 201
    ctx.body = { message: ctx.reqBody }
  }
}
