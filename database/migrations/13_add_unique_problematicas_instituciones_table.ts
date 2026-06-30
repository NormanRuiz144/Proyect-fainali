import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'problematica_institucions'
  private uniqueName = 'problematicas_instituciones_unique'

  async up() {
    await this.db.rawQuery(`
      DELETE FROM ${this.tableName} a
      USING ${this.tableName} b
      WHERE a.id > b.id
        AND a.id_institucion = b.id_institucion
        AND a.id_problematica = b.id_problematica
    `)

    this.schema.alterTable(this.tableName, (table) => {
      table.unique(['id_institucion', 'id_problematica'], this.uniqueName)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropUnique(['id_institucion', 'id_problematica'], this.uniqueName)
    })
  }
}
