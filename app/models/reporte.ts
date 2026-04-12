import { ReporteSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import Institucione from '#models/institucione'
import Problematica from '#models/problematica'
import Sector from '#models/sectores'
import DetalleReportes from './detalleReporte.ts'

export default class Reporte extends ReporteSchema {
  //Descomentar esto cuano ya las otras esten hechas xd

  @belongsTo(() => User, { foreignKey: 'idUsuario' })
  declare usuario: BelongsTo<typeof User>

  @belongsTo(() => Institucione, { foreignKey: 'idInstitucion' })
  declare institucion: BelongsTo<typeof Institucione>

  @belongsTo(() => Problematica, { foreignKey: 'idProblematica' })
  declare problematica: BelongsTo<typeof Problematica>

  @belongsTo(() => Sector, { foreignKey: 'idSector' })
  declare sector: BelongsTo<typeof Sector>

  @belongsTo(() => DetalleReportes, { foreignKey: 'idSector' })
  declare detalleReporte: BelongsTo<typeof DetalleReportes>
}
