import Usuario from '#models/user'
import BannedUser from '#models/banned_user'
import { banUser } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

export default class BanController {
  async banUser({ request, response, auth }: HttpContext) {
    const data = await request.validateUsing(banUser)

    if (data.tipo === 'TEMPORAL' && !data.fechaFin) {
      return response.badRequest({
        message: 'Debes proporcionar una fecha de fin para un ban temporal.',
      })
    }

    const usuarioFinded = await Usuario.find(data.userId)
    if (!usuarioFinded) {
      return response.notFound({ message: 'Usuario no encontrado.' })
    }

    const activeBan = await BannedUser.query()
      .where('user_id', data.userId)
      .andWhere('activo', true)
      .first()
    if (activeBan) {
      return response.conflict({ message: 'El usuario ya tiene un ban activo.' })
    }

    try {
      const ban = await BannedUser.create({
        userId: data.userId,
        adminId: auth.user!.id,
        motivo: data.motivo ?? null,
        tipoBan: data.tipo,
        fechaInicio: DateTime.now(),
        fechaFin: data.fechaFin?.toISODate() ?? null,
        activo: true,
      } as any)

      const tokens = await Usuario.accessTokens.all(usuarioFinded)
      for (const token of tokens) {
        await Usuario.accessTokens.delete(usuarioFinded, token.identifier)
      }

      return response.created({ message: `Usuario baneado ${data.tipo === 'PERMANENTE' ? 'permanentemente' : 'temporalmente'}`, ban })
    } catch (error) {
      return response.internalServerError({ message: 'Error al banear el usuario.', error })
    }
  }

  async unbanUser({ params, response }: HttpContext) {
    const userId = Number(params.userId)
    if (!userId) {
      return response.badRequest({ message: 'ID de usuario inválido.' })
    }

    const activeBan = await BannedUser.query()
      .where('user_id', userId)
      .andWhere('activo', true)
      .first()
    if (!activeBan) {
      return response.notFound({ message: 'El usuario no tiene un ban activo.' })
    }

    try {
      activeBan.activo = false
      await activeBan.save()

      return response.ok({ message: 'Usuario desbaneado exitosamente.' })
    } catch (error) {
      return response.internalServerError({ message: 'Error al desbanear el usuario.', error })
    }
  }

  async listBannedUsers({ request, response }: HttpContext) {
    const pagina = Number(request.input('page', 1))
    const contenidoPagina = 10
    const tipo = request.input('tipo') as string | undefined

    try {
      const query = BannedUser.query()
        .where('activo', true)
        .preload('user', (userQuery) => {
          userQuery.select('id', 'nombres', 'apellidos', 'correo', 'numero_cedula')
        })
        .preload('adminUser', (adminQuery) => {
          adminQuery.select('id', 'nombres', 'apellidos')
        })
        .orderBy('fecha_inicio', 'desc')

      if (tipo && ['TEMPORAL', 'PERMANENTE'].includes(tipo.toUpperCase())) {
        query.where('tipo_ban', tipo.toUpperCase())
      }

      const result = await query.paginate(pagina, contenidoPagina)

      return response.ok(result)
    } catch (error) {
      return response.internalServerError({ message: 'Error al listar baneados.', error })
    }
  }
}
