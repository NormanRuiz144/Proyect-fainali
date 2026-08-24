import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'banned_users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex('fecha_fin', 'idx_fecha_fin')
      table.dropColumn('fecha_fin')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.date('fecha_fin').nullable().after('fecha_inicio')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index('fecha_fin', 'idx_fecha_fin')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropIndex('fecha_fin', 'idx_fecha_fin')
      table.dropColumn('fecha_fin')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.timestamp('fecha_fin').nullable().after('fecha_inicio')
    })

    this.schema.alterTable(this.tableName, (table) => {
      table.index('fecha_fin', 'idx_fecha_fin')
    })
  }
}
