import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reportes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_usuario').references('id').inTable('usuarios').notNullable()
      table.integer('id_institucion').references('id').inTable('instituciones').notNullable()
      table.integer('id_problematica').references('id').inTable('problematicas').notNullable()
      table.integer('id_sector').references('id').inTable('sectores')
      table.string('formato').notNullable()
      table.string('ubicacion').notNullable()
      table.integer('nvl_prioridad')
      table.timestamp('fecha_gen').notNullable()
      table.date('fecha_fin')
      table.string('estado')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
