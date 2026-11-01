import { OperadorPermisoSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Operador from './operador.ts'
import Permiso from './permiso.ts'

export default class OperadorPermiso extends OperadorPermisoSchema {
  static table = 'operador_permiso'

  @belongsTo(() => Operador, { foreignKey: 'idOperador' })
  declare operador: BelongsTo<typeof Operador>

  @belongsTo(() => Permiso, { foreignKey: 'idPermiso' })
  declare permiso: BelongsTo<typeof Permiso>
}
