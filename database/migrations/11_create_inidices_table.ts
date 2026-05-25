import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    // Indices pa usuarios
    this.schema.alterTable('usuarios', (table) => {
      table.index('id_sector')
      table.index('id_rol')
      table.index('id_institucion')
    })

    // Indices pa reportes
    this.schema.alterTable('reportes', (table) => {
      table.index('id_usuario')
      table.index('id_institucion')
      table.index('id_problematica')
      table.index('id_sector')
      table.index('estado')
      table.index('fecha_gen')
      table.index('nvl_prioridad')
    })

    // Indices pa detallereportes
    this.schema.alterTable('detallereportes', (table) => {
      table.index('id_reporte')
      table.index('id_usuario')
      table.index('fecha_seguimiento')
    })

    // Indices pa municipios
    this.schema.alterTable('municipios', (table) => {
      table.index('id_departamento')
    })

    // Indices pa instituciones
    this.schema.alterTable('instituciones', (table) => {
      table.index('id_municipio')
      table.index('nombre_institucion')
    })

    // Indices pa sectores
    this.schema.alterTable('sectores', (table) => {
      table.index('id_municipios')
      table.index('nombre_sector')
    })
  }

  async down() {
    // Eliminar índices de usuarios
    this.schema.alterTable('usuarios', (table) => {
      table.dropIndex(['id_sector'])
      table.dropIndex(['id_rol'])
      table.dropIndex(['id_institucion'])
    })

    // Eliminar índices de reportes
    this.schema.alterTable('reportes', (table) => {
      table.dropIndex(['id_usuario'])
      table.dropIndex(['id_institucion'])
      table.dropIndex(['id_problematica'])
      table.dropIndex(['id_sector'])
      table.dropIndex(['estado'])
      table.dropIndex(['fecha_gen'])
      table.dropIndex(['nvl_prioridad'])
    })

    // Eliminar índices de detallereportes
    this.schema.alterTable('detallereportes', (table) => {
      table.dropIndex(['id_reporte'])
      table.dropIndex(['id_usuario'])
      table.dropIndex(['fecha_seguimiento'])
    })

    // Eliminar índices de municipios
    this.schema.alterTable('municipios', (table) => {
      table.dropIndex(['id_departamento'])
    })

    // Eliminar índices de instituciones
    this.schema.alterTable('instituciones', (table) => {
      table.dropIndex(['id_municipio'])
      table.dropIndex(['nombre_institucion'])
    })

    // Eliminar índices de sectores
    this.schema.alterTable('sectores', (table) => {
      table.dropIndex(['id_municipios'])
      table.dropIndex(['nombre_sector'])
    })
  }
}
