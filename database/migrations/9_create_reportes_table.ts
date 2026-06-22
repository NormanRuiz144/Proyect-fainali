import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reportes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('id_usuario').references('id').inTable('usuarios').notNullable()
      table.integer('id_institucion').references('id').inTable('instituciones').notNullable()
      table.integer('id_problematica').references('id').inTable('problematicas').notNullable()
      table.integer('id_sector').references('id').inTable('sectores')
      table.json('formato').nullable()//esto lo cambie a json para que soporte un array con las URL de cloudinary
      //y se puso el nullable para que se opcional lo de subir imagenes
      table.string('ubicacion').notNullable()
      table.integer('nvl_prioridad')
      table.timestamp('fecha_gen').notNullable()
      table.date('fecha_fin')
      table.string('estado')
      table.text('descripcion').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
