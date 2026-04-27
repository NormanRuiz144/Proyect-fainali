import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class CookieCatcherMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const token = ctx.request.cookie('token_access')

    if (token && !ctx.request.header('authorization')) {
      ctx.request.headers().authorization = `Bearer ${token}`
    }
    return next()
  }
}
