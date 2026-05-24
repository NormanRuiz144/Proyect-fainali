import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detallereportes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.increments('id')
      table.integer('id_reporte').references('id').inTable('reportes').notNullable()
      table.integer('id_usuario').references('id').inTable('usuarios').notNullable()
      table.string('descripcion').notNullable()
      table.date('fecha_seguimiento')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
