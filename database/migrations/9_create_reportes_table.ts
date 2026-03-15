import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reportes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("idUsuario").references("id") .inTable("usuarios")
      table.integer("idInstitucion") //.references("id") .inTable("instituciones")
      table.integer("idProblematica") //.references("id") .inTable("problematicas")
      table.integer("idSector").references("id") .inTable("sectores")
      table.string("formato")
      table.string("ubicacion")
      table.integer("nvl_prioridad")
      table.date("fechaGen")
      table.date("fechaFin")
      table.string("estado")


    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}