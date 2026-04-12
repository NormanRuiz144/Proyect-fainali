
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import { SectoreSchema } from '#database/schema'
import Municipio from './municipio.ts'

export default class Sectores extends SectoreSchema{
  @hasMany(() => Municipio)
  declare municipio: HasMany<typeof Municipio>}
