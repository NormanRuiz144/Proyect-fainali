import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Aligns the independent catalog tables with the approved ER diagram.
 *
 * Existing application tables keep their plural, snake_case physical names;
 * their generated Adonis properties remain camelCase.
 */
export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('problematicas', (table) => {
      table.renameColumn('problema', 'problematica')
    })

    this.schema.alterTable('sectores', (table) => {
      table.dropForeign(['id_municipios'])
      table.dropColumn('id_municipios')
      table.renameColumn('nombre_sector', 'nom_sector')
    })

    this.schema.createTable('permisos', (table) => {
      table.increments('id')
      table.string('codigo').notNullable().unique()
      table.string('nombre').notNullable()
      table.string('descripcion').notNullable()
    })
  }

  async down() {
    this.schema.dropTable('permisos')

    this.schema.alterTable('sectores', (table) => {
      table.renameColumn('nom_sector', 'nombre_sector')
      table.integer('id_municipios').nullable().references('id').inTable('municipios')
    })

    this.schema.alterTable('problematicas', (table) => {
      table.renameColumn('problematica', 'problema')
    })

  }
}
