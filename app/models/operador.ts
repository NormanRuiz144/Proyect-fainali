import { OperadoreSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import BannedUser from './banned_user.ts'
import DetalleIncidencia from './detalle_incidencia.ts'
import OperadorPermiso from './operador_permiso.ts'
import Usuario from './user.ts'

export default class Operador extends OperadoreSchema {
  static table = 'operadores'

  @belongsTo(() => Usuario, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof Usuario>

  @hasMany(() => OperadorPermiso, { foreignKey: 'idOperador' })
  declare permisosAsignados: HasMany<typeof OperadorPermiso>

  @hasMany(() => DetalleIncidencia, { foreignKey: 'idOperador' })
  declare detallesIncidencia: HasMany<typeof DetalleIncidencia>

  @hasMany(() => BannedUser, { foreignKey: 'idOperador' })
  declare baneosRealizados: HasMany<typeof BannedUser>
}
