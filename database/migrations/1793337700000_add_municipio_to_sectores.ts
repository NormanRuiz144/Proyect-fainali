import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('sectores', (table) => {
      table.integer('id_municipio').nullable().references('id').inTable('municipios')
    })
  }

  async down() {
    this.schema.alterTable('sectores', (table) => {
      table.dropForeign(['id_municipio'])
      table.dropColumn('id_municipio')
    })
  }
}
