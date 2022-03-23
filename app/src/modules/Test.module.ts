import { Module } from "../framework/@decorators";
import TestController from "./Test.controller";

const modulemiddleware = (ctx: any, next: () => void) => {
    ctx.r = 6
    console.log("modulemiddleware")
    next()
}

@Module({
    prefix: "/api/v4",
    controllers: [
        TestController
    ],
    middlewares: [
        modulemiddleware
    ]
})
export default class TestModule{}