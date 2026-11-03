import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('usuarios', (table) => {
      table.string('numero_cedula', 30).notNullable().alter()
    })
  }

  async down() {
    this.schema.alterTable('usuarios', (table) => {
      table.bigInteger('numero_cedula').notNullable().alter()
    })
  }
}
