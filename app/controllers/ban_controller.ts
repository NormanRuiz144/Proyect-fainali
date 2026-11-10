import type { HttpContext } from '@adonisjs/core/http'
import BannedUser from '#models/banned_user'
import Operador from '#models/operador'
import Usuario from '#models/user'
import { banUser } from '#validators/user'
import { DateTime } from 'luxon'

export default class BanController {
  async banUser({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(banUser)
    if (data.tipo === 'TEMPORAL' && !data.fechaFin) {
      return response.badRequest({
        message: 'Debes proporcionar una fecha de fin para un ban temporal.',
      })
    }

    const usuario = await Usuario.find(data.userId)
    if (!usuario) {
      return response.notFound({ message: 'Usuario no encontrado.' })
    }

    const authenticatedUser = auth.getUserOrFail()
    const operador = await Operador.query().where('id_usuario', authenticatedUser.id).first()
    if (!operador) {
      return response.forbidden({ message: 'Solo un operador puede banear usuarios.' })
    }

    const activeBan = await BannedUser.query()
      .where('id_usuario', usuario.id)
      .where('activo', true)
      .first()
    if (activeBan) {
      return response.conflict({ message: 'El usuario ya tiene un ban activo.' })
    }

    const ban = await BannedUser.create({
      idUsuario: usuario.id,
      idOperador: operador.id,
      motivo: data.motivo ?? null,
      tipoBan: data.tipo,
      fechaInicio: DateTime.now(),
      fechaFin: data.fechaFin ?? null,
      activo: true,
    })

    const tokens = await Usuario.accessTokens.all(usuario)
    await Promise.all(tokens.map((token) => Usuario.accessTokens.delete(usuario, token.identifier)))

    return response.created({ message: 'Usuario baneado correctamente.', ban })
  }

  async unbanUser({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    if (!Number.isInteger(userId) || userId < 1) {
      return response.badRequest({ message: 'ID de usuario inválido.' })
    }

    const ban = await BannedUser.query().where('id_usuario', userId).where('activo', true).first()
    if (!ban) {
      return response.notFound({ message: 'El usuario no tiene un ban activo.' })
    }

    ban.activo = false
    await ban.save()
    return response.ok({ message: 'Usuario desbaneado correctamente.' })
  }

  async listBannedUsers({ request, response }: HttpContext) {
    const page = Number(request.input('page', 1))
    if (!Number.isInteger(page) || page < 1) {
      return response.badRequest({ message: 'El parámetro page debe ser un entero positivo.' })
    }

    const tipo = request.input('tipo') as string | undefined
    const query = BannedUser.query()
      .where('activo', true)
      .preload('usuario', (userQuery) =>
        userQuery.select('id', 'nombres', 'apellidos', 'correo', 'numero_cedula')
      )
      .preload('operador', (operatorQuery) => {
        operatorQuery.preload('usuario', (userQuery) =>
          userQuery.select('id', 'nombres', 'apellidos')
        )
      })
      .orderBy('fecha_inicio', 'desc')

    if (tipo && ['TEMPORAL', 'PERMANENTE'].includes(tipo.toUpperCase())) {
      query.where('tipo_ban', tipo.toUpperCase())
    }

    return response.ok(await query.paginate(page, 10))
  }
}
