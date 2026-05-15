import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('id_sector').nullable().alter()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.integer('id_sector').notNullable().alter()
    })
  }
}
