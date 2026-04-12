import { ReporteSchema } from '#database/schema'
import { column } from '@adonisjs/lucid/orm'

// Descomentar lo de abajo

// import { belongsTo } from '@adonisjs/lucid/orm'
// import type { BelongsTo } from '@adonisjs/lucid/types/relations'
// import User from '#models/user'
// import Institucione from '#models/institucione'
// import Problematica from '#models/problematica'  
// import Sector from '#models/sectore'

export default class Reporte extends ReporteSchema {

  // Al conseguir la data se pasa a arreglo
  @column({
    consume: (value: any) => {
      if (!value) return null;
      try {
        return typeof value === 'string' ? JSON.parse(value) : value;
      } catch (error) {
        return value;
      }
    }
  })
  declare formato: any

  // Descomentar esto cuano ya las otras esten hechas xd
 
  // @belongsTo(() => User, { foreignKey: 'idUsuario' })
  // declare usuario: BelongsTo<typeof User>

  // @belongsTo(() => Institucione, { foreignKey: 'idInstitucion' })
  // declare institucion: BelongsTo<typeof Institucione>

  // @belongsTo(() => Problematica, { foreignKey: 'idProblematica' })
  // declare problematica: BelongsTo<typeof Problematica>

  // @belongsTo(() => Sector, { foreignKey: 'idSector' })
  // declare sector: BelongsTo<typeof Sector>
}