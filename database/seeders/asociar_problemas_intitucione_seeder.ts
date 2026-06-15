import Institucione from '#models/institucione'
import Problematica from '#models/problematica'
import ProblematicaInstitucion from '#models/problematica_institucion'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    const instituciones = await Institucione.all()
    const problematicas = await Problematica.all()

    const getInst = (nombre: string) =>
      instituciones.find((i) => i.nombreInstitucion === nombre)?.id
    const getProb = (problema: string) => problematicas.find((p) => p.problema === problema)?.id

    const asociaciones: { idInstitucion: number; idProblematica: number }[] = [
      // Fuga de agua -> ENACAL
      { idInstitucion: getInst('ENACAL')!, idProblematica: getProb('Fuga de agua en la calle')! },
      // Incendio -> Alcaldía de Rivas, MINSA
      { idInstitucion: getInst('Alcaldía de Rivas')!, idProblematica: getProb('Incendio')! },
      { idInstitucion: getInst('MINSA')!, idProblematica: getProb('Incendio')! },
      // Alteracion y disturbio -> Policia Nacional
      {
        idInstitucion: getInst('Policia Nacional Rivas')!,
        idProblematica: getProb('Alteracion y disturbio')!,
      },
      // Baches -> MTI, Alcaldía de Rivas
      { idInstitucion: getInst('MTI')!, idProblematica: getProb('Baches en la calle')! },
      {
        idInstitucion: getInst('Alcaldía de Rivas')!,
        idProblematica: getProb('Baches en la calle')!,
      },
      // Aguas estancadas -> ENACAL, MINSA, Alcaldía de Rivas
      { idInstitucion: getInst('ENACAL')!, idProblematica: getProb('Aguas estancadas')! },
      { idInstitucion: getInst('MINSA')!, idProblematica: getProb('Aguas estancadas')! },
      {
        idInstitucion: getInst('Alcaldía de Rivas')!,
        idProblematica: getProb('Aguas estancadas')!,
      },
      // Cables tendidos -> ENATREL, Alcaldía de Rivas
      { idInstitucion: getInst('ENATREL')!, idProblematica: getProb('Cables tendidos')! },
      { idInstitucion: getInst('Alcaldía de Rivas')!, idProblematica: getProb('Cables tendidos')! },
      // Corte de energía -> ENATREL
      {
        idInstitucion: getInst('ENATREL')!,
        idProblematica: getProb('Corte de energía eléctrica')!,
      },
      // Basura acumulada -> Alcaldía de Rivas, MINSA
      {
        idInstitucion: getInst('Alcaldía de Rivas')!,
        idProblematica: getProb('Basura acumulada')!,
      },
      { idInstitucion: getInst('MINSA')!, idProblematica: getProb('Basura acumulada')! },
    ]

    for (const asociacion of asociaciones) {
      const exists = await ProblematicaInstitucion.query()
        .where('id_institucion', asociacion.idInstitucion)
        .where('id_problematica', asociacion.idProblematica)
        .first()

      if (!exists) {
        await ProblematicaInstitucion.create(asociacion)
      }
    }
  }
}
