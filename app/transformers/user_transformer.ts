import type Operador from '#models/operador'
import type OperadorPermiso from '#models/operador_permiso'
import type Permiso from '#models/permiso'
import type Sectores from '#models/sectores'
import type User from '#models/user'
import { BaseTransformer } from '@adonisjs/core/transformers'

export default class UserTransformer extends BaseTransformer<User> {
  toObject() {
    const sector = this.resource.$preloaded.sector as Sectores | undefined
    const operador = this.resource.$preloaded.operador as Operador | undefined
    const asignaciones = operador?.$preloaded.permisosAsignados as OperadorPermiso[] | undefined
    const permisos =
      asignaciones
        ?.filter((asignacion) => asignacion.activo)
        .map((asignacion) => (asignacion.$preloaded.permiso as Permiso | undefined)?.codigo)
        .filter((codigo): codigo is string => Boolean(codigo)) ?? []

    return {
      ...this.pick(this.resource, [
        'apellidos',
        'correo',
        'createdAt',
        'id',
        'idSector',
        'nombres',
        'numeroCedula',
        'sexo',
        'updatedAt',
      ]),
      sector: sector ? { id: sector.id, nomSector: sector.nomSector } : null,
      operador: operador ? { id: operador.id } : null,
      permisos,
    }
  }
}
