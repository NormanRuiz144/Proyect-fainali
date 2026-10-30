import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'operadores'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['id_usuario'])
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['id_usuario'])
    })
  }
}
