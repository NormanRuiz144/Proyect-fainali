import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reportes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('idUsuario').references('id').inTable('usuarios').notNullable()
      table.integer('idInstitucion').references('id').inTable('instituciones').notNullable()
      table.integer('idProblematica').references('id').inTable('problematicas').notNullable()
      table.integer('idSector').references('id').inTable('sectores')
      table.string('formato').notNullable()
      table.string('ubicacion').notNullable()
      table.integer('nvl_prioridad')
      table.date('fechaGen').notNullable()
      table.date('fechaFin')
      table.string('estado')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
