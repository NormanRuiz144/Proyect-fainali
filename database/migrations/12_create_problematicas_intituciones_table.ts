import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'problematica_institucions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_problematica').references('id').inTable('problematicas').notNullable()
      table.integer('id_institucion').references('id').inTable('instituciones').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
