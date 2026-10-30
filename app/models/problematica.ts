import { ProblematicaSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Incidencia from './incidencia.ts'

export default class Problematica extends ProblematicaSchema {
  @hasMany(() => Incidencia, { foreignKey: 'idProblematica' })
  declare incidencias: HasMany<typeof Incidencia>
}
