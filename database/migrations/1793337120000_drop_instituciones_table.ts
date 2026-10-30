import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('operadores', (table) => {
      table.dropForeign(['id_institucion'])
      table.dropColumn('id_institucion')
    })

    // Renaming reportes to incidencias preserves PostgreSQL's original
    // constraint name: reportes_id_institucion_foreign.
    await this.db.raw(
      'ALTER TABLE incidencias DROP CONSTRAINT IF EXISTS reportes_id_institucion_foreign'
    )

    this.schema.alterTable('incidencias', (table) => {
      table.dropColumn('id_institucion')
    })

    this.schema.dropTable('instituciones')
  }

  async down() {
    this.schema.createTable('instituciones', (table) => {
      table.increments('id')
      table.string('nombre_institucion').notNullable()
      table.integer('id_sector').notNullable().references('id').inTable('sectores')
      table.boolean('is_deleted').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    this.schema.alterTable('operadores', (table) => {
      table.integer('id_institucion').notNullable().references('id').inTable('instituciones')
    })

    this.schema.alterTable('incidencias', (table) => {
      table.integer('id_institucion').notNullable().references('id').inTable('instituciones')
    })
  }
}
