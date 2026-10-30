import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import db from '@adonisjs/lucid/services/db'
import Operador from '#models/operador'

/**
 * Restringe una ruta a operadores que tengan todos los permisos indicados.
 * El permiso se considera vigente únicamente cuando su asignación en
 * operador_permiso está activa.
 */
export default class PermisosOperadorMiddleware {
  async handle(ctx: HttpContext, next: NextFn, requiredPermissions: string[] = []) {
    const usuario = ctx.auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', usuario.id).first()

    if (!operador) {
      return ctx.response.forbidden({
        mensaje: 'Esta acción solo puede ser realizada por un operador.',
      })
    }

    const permissions = [
      ...new Set(requiredPermissions.map((permission) => permission.trim())),
    ].filter(Boolean)
    if (permissions.length === 0) return next()

    const assignedPermissions = await db
      .from('operador_permiso as asignacion')
      .innerJoin('permisos as permiso', 'permiso.id', 'asignacion.id_permiso')
      .where('asignacion.id_operador', operador.id)
      .where('asignacion.activo', true)
      .whereIn('permiso.codigo', permissions)
      .select('permiso.codigo')

    const assigned = new Set(assignedPermissions.map((permission) => permission.codigo))
    const missingPermissions = permissions.filter((permission) => !assigned.has(permission))
    if (missingPermissions.length > 0) {
      return ctx.response.forbidden({
        mensaje: 'El operador no tiene los permisos necesarios para esta acción.',
        permisosFaltantes: missingPermissions,
      })
    }

    return next()
  }
}
