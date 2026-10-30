import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'problematica_institucions'

  async up() {
    this.schema.dropTable(this.tableName)
  }

  async down() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_problematica').notNullable().references('id').inTable('problematicas')
      table.integer('id_institucion').notNullable().references('id').inTable('instituciones')
      table.unique(['id_institucion', 'id_problematica'], 'problematicas_instituciones_unique')
    })
  }
}
