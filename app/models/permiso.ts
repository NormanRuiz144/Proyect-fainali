import { PermisoSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import OperadorPermiso from './operador_permiso.ts'

export default class Permiso extends PermisoSchema {
  @hasMany(() => OperadorPermiso, { foreignKey: 'idPermiso' })
  declare operadoresAsignados: HasMany<typeof OperadorPermiso>
}
