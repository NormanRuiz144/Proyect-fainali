import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import PermisosOperadorMiddleware from '#middleware/permisos_operador_middleware'

/**
 * Autoriza exclusivamente a operadores con el permiso activo
 * `permisos.administrar` para gestionar permisos y sus asignaciones.
 */
export default class AdministrarPermisosMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    return new PermisosOperadorMiddleware().handle(ctx, next, ['permisos.administrar'])
  }
}
