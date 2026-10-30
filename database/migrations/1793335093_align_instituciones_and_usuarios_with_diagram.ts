import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Aligns Institucion and Usuarios with their relationships and field types
 * in the approved ER diagram.
 */
export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('instituciones', (table) => {
      table.dropForeign(['id_municipio'])
      table.renameColumn('id_municipio', 'id_sector')
    })

    this.schema.alterTable('instituciones', (table) => {
      table.integer('id_sector').notNullable().alter()
      table.foreign('id_sector').references('id').inTable('sectores')
    })

    this.schema.alterTable('usuarios', (table) => {
      table.dropForeign(['id_rol'])
      table.dropForeign(['id_institucion'])
      table.dropColumn('id_rol')
      table.dropColumn('id_institucion')
      table.renameColumn('contrasena', 'password')
    })

    this.schema.alterTable('usuarios', (table) => {
      table.bigInteger('numero_cedula').notNullable().alter()
      table.integer('id_sector').notNullable().alter()
    })
  }

  async down() {
    this.schema.alterTable('usuarios', (table) => {
      table.string('numero_cedula', 16).notNullable().alter()
      table.renameColumn('password', 'contrasena')
      table.integer('id_rol').notNullable().references('id').inTable('roles')
      table.integer('id_institucion').nullable().references('id').inTable('instituciones')
    })

    this.schema.alterTable('instituciones', (table) => {
      table.dropForeign(['id_sector'])
      table.renameColumn('id_sector', 'id_municipio')
    })

    this.schema.alterTable('instituciones', (table) => {
      table.integer('id_municipio').nullable().alter()
      table.foreign('id_municipio').references('id').inTable('municipios')
    })
  }
}
