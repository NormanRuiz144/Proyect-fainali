import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('detallereportes', (table) => {
      table.dropForeign(['id_reporte'])
      table.dropForeign(['id_usuario'])
    })

    this.schema.renameTable('detallereportes', 'detalle_incidencias')

    this.schema.alterTable('detalle_incidencias', (table) => {
      table.renameColumn('id_reporte', 'id_incidencia')
      table.renameColumn('id_usuario', 'id_operador')
    })

    this.schema.alterTable('detalle_incidencias', (table) => {
      table.foreign('id_incidencia').references('id').inTable('incidencias')
      table.foreign('id_operador').references('id').inTable('operadores')
    })

    this.schema.createTable('detalle_mensajes', (table) => {
      table.increments('id')
      table
        .integer('id_detalle_incidencia')
        .notNullable()
        .references('id')
        .inTable('detalle_incidencias')
      table.integer('id_mensaje').notNullable().references('id').inTable('mensajes')
    })
  }

  async down() {
    this.schema.dropTable('detalle_mensajes')

    this.schema.alterTable('detalle_incidencias', (table) => {
      table.dropForeign(['id_incidencia'])
      table.dropForeign(['id_operador'])
      table.renameColumn('id_incidencia', 'id_reporte')
      table.renameColumn('id_operador', 'id_usuario')
    })

    this.schema.renameTable('detalle_incidencias', 'detallereportes')

    this.schema.alterTable('detallereportes', (table) => {
      table.foreign('id_reporte').references('id').inTable('reportes')
      table.foreign('id_usuario').references('id').inTable('usuarios')
    })
  }
}
