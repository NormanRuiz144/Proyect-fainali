import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('numeroCedula').notNullable()
      table.string('nombres',40)
      table.string('apellidos',40)
      table.string('sexo',1)
      table.string('correo').unique
      table.string('contraseña',15)
      table.integer('idSector').references("id") .inTable("sectores")
      table.integer('idRol').references("id") .inTable("roles")
      table.integer('idInstitucion')
      
      

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
