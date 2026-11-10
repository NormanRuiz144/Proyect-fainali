import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('sectores', (table) => {
      table.unique(['id_municipio', 'nom_sector'])
    })
  }

  async down() {
    this.schema.alterTable('sectores', (table) => {
      table.dropUnique(['id_municipio', 'nom_sector'])
    })
  }
}
