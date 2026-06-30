import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'banned_users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['user_id', 'activo'], 'idx_usuario_activo')
      table.dropIndex('fecha_fin', 'idx_fecha_fin')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fecha_fin')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('fecha_fin').nullable().after('fecha_inicio')
      table.timestamp('updated_at').nullable().after('activo')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['user_id', 'activo'], 'idx_usuario_activo')
      table.index('fecha_fin', 'idx_fecha_fin')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex(['user_id', 'activo'], 'idx_usuario_activo')
      table.dropIndex('fecha_fin', 'idx_fecha_fin')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('fecha_fin')
      table.dropColumn('updated_at')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.time('fecha_fin').notNullable().after('fecha_inicio')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index(['user_id', 'activo'], 'idx_usuario_activo')
      table.index('fecha_fin', 'idx_fecha_fin')
    })
  }
}
