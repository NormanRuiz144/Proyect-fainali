import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'detallereportes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('idReporte').references('id').inTable('reportes').notNullable()
      table.integer('idUsuario').references('id').inTable('usuarios').notNullable()
      table.string('descripcion').notNullable()
      table.date('fechaSeguimiento')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
