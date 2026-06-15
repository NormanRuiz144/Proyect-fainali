import { ProblematicaInstitucionSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import Problematica from './problematica.ts'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Institucione from './institucione.ts'

export default class ProblematicaInstitucion extends ProblematicaInstitucionSchema {
  @belongsTo(() => Problematica, { foreignKey: 'idProblematica' })
  declare problematica: BelongsTo<typeof Problematica>

  @belongsTo(() => Institucione, { foreignKey: 'idInstitucion' })
  declare institucion: BelongsTo<typeof Institucione>
}
