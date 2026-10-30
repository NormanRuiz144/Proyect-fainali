import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'operador_permiso'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_operador').notNullable().references('id').inTable('operadores')
      table.integer('id_permiso').notNullable().references('id').inTable('permisos')

      table.unique(['id_operador', 'id_permiso'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
