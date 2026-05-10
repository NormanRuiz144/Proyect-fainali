import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuardianRolesMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    const userActual = await ctx.auth.authenticate()
    await userActual.load((preloader) => {
      preloader.load('rol')
    })
    const allowed = allowedRoles.map((role) => role.toLowerCase())
    if (!userActual.rol || !allowed.includes(userActual.rol.rol.toLowerCase())) {
      return ctx.response.forbidden({ error: 'Acceso denegado' })
    }
    return next()
  }
}
