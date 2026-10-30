import { DetalleMensajeSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import DetalleIncidencia from './detalle_incidencia.ts'
import Mensaje from './mensaje.ts'

export default class DetalleMensaje extends DetalleMensajeSchema {
  @belongsTo(() => DetalleIncidencia, { foreignKey: 'idDetalleIncidencia' })
  declare detalleIncidencia: BelongsTo<typeof DetalleIncidencia>

  @belongsTo(() => Mensaje, { foreignKey: 'idMensaje' })
  declare mensaje: BelongsTo<typeof Mensaje>
}
