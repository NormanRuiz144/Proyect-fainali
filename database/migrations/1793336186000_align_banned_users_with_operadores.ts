import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'banned_users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['user_id'])
      table.dropForeign(['admin_id'])
      table.renameColumn('user_id', 'id_usuario')
      table.renameColumn('admin_id', 'id_operador')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('id_usuario').references('id').inTable('usuarios')
      table.foreign('id_operador').references('id').inTable('operadores')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropForeign(['id_usuario'])
      table.dropForeign(['id_operador'])
      table.renameColumn('id_usuario', 'user_id')
      table.renameColumn('id_operador', 'admin_id')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.foreign('user_id').references('id').inTable('usuarios')
      table.foreign('admin_id').references('id').inTable('usuarios')
    })
  }
}
