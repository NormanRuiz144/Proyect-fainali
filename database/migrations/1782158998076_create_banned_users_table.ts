import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'banned_users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').references('id').inTable('usuarios').notNullable()
      table.integer('admin_id').references('id').inTable('usuarios').notNullable()
      table.string('motivo')
      table.enum('tipo_ban', ['TEMPORAL', 'PERMANENTE']).defaultTo('TEMPORAL')
      table.timestamp('fecha_inicio')
      table.time('fecha_fin').notNullable()
      table.boolean('activo').defaultTo(true)
    })

    this.schema.alterTable('banned_users', (table) => {
      table.index(['user_id', 'activo'], 'idx_usuario_activo')
      table.index('fecha_fin', 'idx_fecha_fin')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
    this.schema.alterTable('banned_users', (table) => {
      table.dropIndex(['user_id', 'activo'], 'idx_usuario_activo')
      table.dropIndex('fecha_fin', 'idx_fecha_fin')
    })
  }
}
