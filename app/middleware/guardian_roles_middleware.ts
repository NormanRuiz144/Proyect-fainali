import Roles from '#models/roles'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class GuardianRolesMiddleware {
  async handle(ctx: HttpContext, next: NextFn, allowedRoles: string[]) {
    await ctx.auth.authenticate()
    const userActual = ctx.auth.getUserOrFail()
    const userRole = await Roles.findBy('id', userActual.idRol)
    const allowed = allowedRoles.map((role) => role.toLowerCase())

    if (!userRole || !allowed.includes(userRole.rol.toLowerCase())) {
      return ctx.response.forbidden({ error: 'Acceso denegado' })
    }
    return next()
  }
}
