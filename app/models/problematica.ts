import { ProblematicaSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Reporte from './reporte.ts'
import ProblematicaInstitucion from './problematica_institucion.ts'

export default class Problematica extends ProblematicaSchema {
  @hasMany(() => Reporte)
  declare reporte: HasMany<typeof Reporte>

  @hasMany(() => ProblematicaInstitucion, { foreignKey: 'idProblematica' })
  declare problematicaInstitucion: HasMany<typeof ProblematicaInstitucion>
}
