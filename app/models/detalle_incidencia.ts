import { DetalleIncidenciaSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import DetalleMensaje from './detalle_mensaje.ts'
import Incidencia from './incidencia.ts'
import Operador from './operador.ts'

export default class DetalleIncidencia extends DetalleIncidenciaSchema {
  @belongsTo(() => Incidencia, { foreignKey: 'idIncidencia' })
  declare incidencia: BelongsTo<typeof Incidencia>

  @belongsTo(() => Operador, { foreignKey: 'idOperador' })
  declare operador: BelongsTo<typeof Operador>

  @hasMany(() => DetalleMensaje, { foreignKey: 'idDetalleIncidencia' })
  declare mensajes: HasMany<typeof DetalleMensaje>
}
