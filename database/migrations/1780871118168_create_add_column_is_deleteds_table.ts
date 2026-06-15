import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tables = ['departamentos', 'municipios', 'sectores', 'problematicas', 'instituciones']

  async up() {
    for (const table of this.tables) {
      this.schema.alterTable(table, (table) => {
        table.boolean('is_deleted').defaultTo(false)
      })
    }
  }

  async down() {
    for (const table of this.tables) {
      this.schema.alterTable(table, (table) => {
        table.dropColumn('is_deleted')
      })
    }
  }
}
