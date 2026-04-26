import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usuarios'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('numero_cedula', 16).notNullable().unique()
      table.string('nombres', 40).notNullable()
      table.string('apellidos', 40).notNullable()
      table.string('sexo', 1)
      table.string('correo').notNullable().unique()
      table.string('contrasena', 255).notNullable()
      table.integer('id_sector').references('id').inTable('sectores').notNullable()
      table.integer('id_rol').references('id').inTable('roles').notNullable()
      table.integer('id_institucion').references('id').inTable('instituciones').nullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
