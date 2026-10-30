import { MensajeSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import DetalleMensaje from './detalle_mensaje.ts'
import Usuario from './user.ts'

export default class Mensaje extends MensajeSchema {
  @belongsTo(() => Usuario, { foreignKey: 'creadoPor' })
  declare creador: BelongsTo<typeof Usuario>

  @hasMany(() => DetalleMensaje, { foreignKey: 'idMensaje' })
  declare detalles: HasMany<typeof DetalleMensaje>
}
