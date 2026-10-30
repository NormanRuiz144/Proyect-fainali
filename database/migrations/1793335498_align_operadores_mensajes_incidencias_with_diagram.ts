import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Creates Operadores and Mensajes, and aligns the former reportes table with
 * the Incidencia entity in the approved ER diagram.
 */
export default class extends BaseSchema {
  async up() {
    this.schema.createTable('operadores', (table) => {
      table.increments('id')
      table.integer('id_institucion').notNullable().references('id').inTable('instituciones')
      table.integer('id_usuario').notNullable().references('id').inTable('usuarios')
    })

    this.schema.createTable('mensajes', (table) => {
      table.increments('id')
      table.string('mensaje').notNullable()
      table.timestamp('fecha_creacion').notNullable()
      table.integer('creado_por').notNullable().references('id').inTable('usuarios')
    })

    this.schema.renameTable('reportes', 'incidencias')

  }

  async down() {
    this.schema.renameTable('incidencias', 'reportes')
    this.schema.dropTable('mensajes')
    this.schema.dropTable('operadores')
  }
}
