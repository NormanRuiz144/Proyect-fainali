/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'public.user.registrarse': {
    methods: ["POST"]
    pattern: '/public/registro'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['registrarse']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['registrarse']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'public.departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"]
    pattern: '/public/departamentos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['obtenerDepartamentos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['obtenerDepartamentos']>>>
    }
  }
  'public.municipios.municipios_por_departamento': {
    methods: ["GET","HEAD"]
    pattern: '/public/departamentos/:id/municipios'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['municipiosPorDepartamento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['municipiosPorDepartamento']>>>
    }
  }
  'public.problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"]
    pattern: '/public/problematicas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['obtenerProblematicas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['obtenerProblematicas']>>>
    }
  }
  'public.sectores.obtener_sectores': {
    methods: ["GET","HEAD"]
    pattern: '/public/sectores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectores']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectores']>>>
    }
  }
  'access_token.store': {
    methods: ["POST"]
    pattern: '/auth/login'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').loginValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').loginValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'access_token.destroy': {
    methods: ["POST"]
    pattern: '/auth/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/access_token_controller').default['destroy']>>>
    }
  }
  'profile.show': {
    methods: ["GET","HEAD"]
    pattern: '/account/profile'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profile_controller').default['show']>>>
    }
  }
  'user.list_usuarios': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['listUsuarios']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['listUsuarios']>>>
    }
  }
  'user.crear_usuario': {
    methods: ["POST"]
    pattern: '/usuarios'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').crearUsuarioValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').crearUsuarioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['crearUsuario']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['crearUsuario']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.buscar_usurio_by_id': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/:userId'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['buscarUsurioById']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['buscarUsurioById']>>>
    }
  }
  'user.actualizar_usuario': {
    methods: ["PUT"]
    pattern: '/usuarios/:userId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').actualizarUsuarioValidator)>>
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').actualizarUsuarioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['actualizarUsuario']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['actualizarUsuario']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ban.ban_user': {
    methods: ["POST"]
    pattern: '/usuarios/baneos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').banUser)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').banUser)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ban_controller').default['banUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ban_controller').default['banUser']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'ban.unban_user': {
    methods: ["PATCH"]
    pattern: '/usuarios/:userId/desbanear'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ban_controller').default['unbanUser']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ban_controller').default['unbanUser']>>>
    }
  }
  'ban.list_banned_users': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/baneos/activos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/ban_controller').default['listBannedUsers']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/ban_controller').default['listBannedUsers']>>>
    }
  }
  'departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"]
    pattern: '/departamentos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['obtenerDepartamentos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['obtenerDepartamentos']>>>
    }
  }
  'departamentos.crear_departamento': {
    methods: ["POST"]
    pattern: '/departamentos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/departamento').ingresarDepart)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/departamento').ingresarDepart)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['crearDepartamento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['crearDepartamento']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'departamentos.actualizar_depart': {
    methods: ["PUT"]
    pattern: '/departamentos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/departamento').ingresarDepart)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/departamento').ingresarDepart)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['actualizarDepart']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['actualizarDepart']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'departamentos.eliminar_departamento': {
    methods: ["DELETE"]
    pattern: '/departamentos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['eliminarDepartamento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['eliminarDepartamento']>>>
    }
  }
  'departamentos.restaurar_departamento': {
    methods: ["PATCH"]
    pattern: '/departamentos/:id/restaurar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['restaurarDepartamento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['restaurarDepartamento']>>>
    }
  }
  'municipios.municipios_por_departamento': {
    methods: ["GET","HEAD"]
    pattern: '/departamentos/:id/municipios'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['municipiosPorDepartamento']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['municipiosPorDepartamento']>>>
    }
  }
  'municipios.obtener_municipios': {
    methods: ["GET","HEAD"]
    pattern: '/municipios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['obtenerMunicipios']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['obtenerMunicipios']>>>
    }
  }
  'municipios.crear_municipio': {
    methods: ["POST"]
    pattern: '/municipios'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/municipio').ingresarMuni)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/municipio').ingresarMuni)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['crearMunicipio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['crearMunicipio']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'municipios.actualizar_municipio': {
    methods: ["PUT"]
    pattern: '/municipios/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/municipio').ingresarMuni)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/municipio').ingresarMuni)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['actualizarMunicipio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['actualizarMunicipio']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'municipios.eliminar_municipio': {
    methods: ["DELETE"]
    pattern: '/municipios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['eliminarMunicipio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['eliminarMunicipio']>>>
    }
  }
  'municipios.restaurar_municipio': {
    methods: ["PATCH"]
    pattern: '/municipios/:id/restaurar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['restaurarMunicipio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['restaurarMunicipio']>>>
    }
  }
  'problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"]
    pattern: '/problematicas'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['obtenerProblematicas']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['obtenerProblematicas']>>>
    }
  }
  'problematicas.crear_problematica': {
    methods: ["POST"]
    pattern: '/problematicas'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/problematica').ingresarProblematica)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/problematica').ingresarProblematica)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['crearProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['crearProblematica']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'problematicas.obtener_problematica': {
    methods: ["GET","HEAD"]
    pattern: '/problematicas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['obtenerProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['obtenerProblematica']>>>
    }
  }
  'problematicas.actualizar_problematica': {
    methods: ["PUT"]
    pattern: '/problematicas/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/problematica').ingresarProblematica)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/problematica').ingresarProblematica)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['actualizarProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['actualizarProblematica']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'problematicas.eliminar_problematica': {
    methods: ["DELETE"]
    pattern: '/problematicas/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['eliminarProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['eliminarProblematica']>>>
    }
  }
  'problematicas.restaurar_problematica': {
    methods: ["PATCH"]
    pattern: '/problematicas/:id/restaurar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['restaurarProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['restaurarProblematica']>>>
    }
  }
  'sectores.obtener_sectores': {
    methods: ["GET","HEAD"]
    pattern: '/sectores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectores']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectores']>>>
    }
  }
  'sectores.crear_sector': {
    methods: ["POST"]
    pattern: '/sectores'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['crearSector']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['crearSector']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sectores.obtener_sector_id': {
    methods: ["GET","HEAD"]
    pattern: '/sectores/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectorId']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectorId']>>>
    }
  }
  'sectores.actualizar_sector': {
    methods: ["PUT"]
    pattern: '/sectores/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['actualizarSector']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['actualizarSector']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sectores.eliminar_sector': {
    methods: ["DELETE"]
    pattern: '/sectores/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['eliminarSector']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['eliminarSector']>>>
    }
  }
  'sectores.restaurar_sector': {
    methods: ["PATCH"]
    pattern: '/sectores/:id/restaurar'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['restaurarSector']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['restaurarSector']>>>
    }
  }
  'incidencias.historial_usuario': {
    methods: ["GET","HEAD"]
    pattern: '/incidencias/historial'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['historialUsuario']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['historialUsuario']>>>
    }
  }
  'incidencias.obtener_incidencias': {
    methods: ["GET","HEAD"]
    pattern: '/incidencias'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['obtenerIncidencias']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['obtenerIncidencias']>>>
    }
  }
  'incidencias.crear_incidencia': {
    methods: ["POST"]
    pattern: '/incidencias'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/incidencia').crearIncidenciaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/incidencia').crearIncidenciaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['crearIncidencia']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['crearIncidencia']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'incidencias.obtener_incidencia': {
    methods: ["GET","HEAD"]
    pattern: '/incidencias/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['obtenerIncidencia']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['obtenerIncidencia']>>>
    }
  }
  'incidencias.actualizar_incidencia': {
    methods: ["PUT"]
    pattern: '/incidencias/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/incidencia').actualizarIncidenciaValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/incidencia').actualizarIncidenciaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['actualizarIncidencia']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['actualizarIncidencia']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'incidencias.actualizar_estado_incidencia': {
    methods: ["PATCH"]
    pattern: '/incidencias/:id/estado'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/incidencia').actualizarEstadoIncidenciaValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/incidencia').actualizarEstadoIncidenciaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['actualizarEstadoIncidencia']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/incidencias_controller').default['actualizarEstadoIncidencia']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'detalle_incidencias.obtener_detalles': {
    methods: ["GET","HEAD"]
    pattern: '/detalle-incidencias'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['obtenerDetalles']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['obtenerDetalles']>>>
    }
  }
  'detalle_incidencias.crear_detalle': {
    methods: ["POST"]
    pattern: '/detalle-incidencias'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/detalle_incidencia').crearDetalleIncidenciaValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/detalle_incidencia').crearDetalleIncidenciaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['crearDetalle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['crearDetalle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'detalle_incidencias.obtener_detalle': {
    methods: ["GET","HEAD"]
    pattern: '/detalle-incidencias/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['obtenerDetalle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['obtenerDetalle']>>>
    }
  }
  'detalle_incidencias.actualizar_detalle': {
    methods: ["PUT"]
    pattern: '/detalle-incidencias/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/detalle_incidencia').actualizarDetalleIncidenciaValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/detalle_incidencia').actualizarDetalleIncidenciaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['actualizarDetalle']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_incidencias_controller').default['actualizarDetalle']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'operadores.obtener_operadores': {
    methods: ["GET","HEAD"]
    pattern: '/operadores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['obtenerOperadores']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['obtenerOperadores']>>>
    }
  }
  'operadores.crear_operador': {
    methods: ["POST"]
    pattern: '/operadores'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/operador').crearOperadorValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/operador').crearOperadorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['crearOperador']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['crearOperador']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'operadores.obtener_operador': {
    methods: ["GET","HEAD"]
    pattern: '/operadores/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['obtenerOperador']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['obtenerOperador']>>>
    }
  }
  'operadores.actualizar_operador': {
    methods: ["PUT"]
    pattern: '/operadores/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/operador').actualizarOperadorValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/operador').actualizarOperadorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['actualizarOperador']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['actualizarOperador']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'operadores.eliminar_operador': {
    methods: ["DELETE"]
    pattern: '/operadores/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['eliminarOperador']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operadores_controller').default['eliminarOperador']>>>
    }
  }
  'permisos.obtener_permisos': {
    methods: ["GET","HEAD"]
    pattern: '/permisos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['obtenerPermisos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['obtenerPermisos']>>>
    }
  }
  'permisos.crear_permiso': {
    methods: ["POST"]
    pattern: '/permisos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/permiso').crearPermisoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/permiso').crearPermisoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['crearPermiso']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['crearPermiso']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'permisos.obtener_permiso': {
    methods: ["GET","HEAD"]
    pattern: '/permisos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['obtenerPermiso']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['obtenerPermiso']>>>
    }
  }
  'permisos.actualizar_permiso': {
    methods: ["PUT"]
    pattern: '/permisos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/permiso').actualizarPermisoValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/permiso').actualizarPermisoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['actualizarPermiso']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['actualizarPermiso']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'permisos.eliminar_permiso': {
    methods: ["DELETE"]
    pattern: '/permisos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['eliminarPermiso']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/permisos_controller').default['eliminarPermiso']>>>
    }
  }
  'operador_permisos.obtener_asignaciones': {
    methods: ["GET","HEAD"]
    pattern: '/operador-permisos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['obtenerAsignaciones']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['obtenerAsignaciones']>>>
    }
  }
  'operador_permisos.asignar_permiso': {
    methods: ["POST"]
    pattern: '/operador-permisos'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/operador_permiso').asignarPermisoOperadorValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/operador_permiso').asignarPermisoOperadorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['asignarPermiso']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['asignarPermiso']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'operador_permisos.obtener_asignacion': {
    methods: ["GET","HEAD"]
    pattern: '/operador-permisos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['obtenerAsignacion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['obtenerAsignacion']>>>
    }
  }
  'operador_permisos.actualizar_asignacion': {
    methods: ["PUT"]
    pattern: '/operador-permisos/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/operador_permiso').actualizarPermisoOperadorValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/operador_permiso').actualizarPermisoOperadorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['actualizarAsignacion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['actualizarAsignacion']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'operador_permisos.eliminar_asignacion': {
    methods: ["DELETE"]
    pattern: '/operador-permisos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['eliminarAsignacion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/operador_permisos_controller').default['eliminarAsignacion']>>>
    }
  }
  'mensajes.obtener_mensajes': {
    methods: ["GET","HEAD"]
    pattern: '/mensajes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['obtenerMensajes']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['obtenerMensajes']>>>
    }
  }
  'mensajes.crear_mensaje': {
    methods: ["POST"]
    pattern: '/mensajes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/mensaje').crearMensajeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/mensaje').crearMensajeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['crearMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['crearMensaje']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'mensajes.obtener_mensaje': {
    methods: ["GET","HEAD"]
    pattern: '/mensajes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['obtenerMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['obtenerMensaje']>>>
    }
  }
  'mensajes.actualizar_mensaje': {
    methods: ["PUT"]
    pattern: '/mensajes/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/mensaje').actualizarMensajeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/mensaje').actualizarMensajeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['actualizarMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['actualizarMensaje']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'mensajes.eliminar_mensaje': {
    methods: ["DELETE"]
    pattern: '/mensajes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['eliminarMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/mensajes_controller').default['eliminarMensaje']>>>
    }
  }
  'detalle_mensajes.obtener_detalle_mensajes': {
    methods: ["GET","HEAD"]
    pattern: '/detalle-mensajes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['obtenerDetalleMensajes']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['obtenerDetalleMensajes']>>>
    }
  }
  'detalle_mensajes.crear_detalle_mensaje': {
    methods: ["POST"]
    pattern: '/detalle-mensajes'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/detalle_mensaje').crearDetalleMensajeValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/detalle_mensaje').crearDetalleMensajeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['crearDetalleMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['crearDetalleMensaje']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'detalle_mensajes.obtener_detalle_mensaje': {
    methods: ["GET","HEAD"]
    pattern: '/detalle-mensajes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['obtenerDetalleMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['obtenerDetalleMensaje']>>>
    }
  }
  'detalle_mensajes.actualizar_detalle_mensaje': {
    methods: ["PUT"]
    pattern: '/detalle-mensajes/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/detalle_mensaje').actualizarDetalleMensajeValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/detalle_mensaje').actualizarDetalleMensajeValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['actualizarDetalleMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['actualizarDetalleMensaje']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'detalle_mensajes.eliminar_detalle_mensaje': {
    methods: ["DELETE"]
    pattern: '/detalle-mensajes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['eliminarDetalleMensaje']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detalle_mensajes_controller').default['eliminarDetalleMensaje']>>>
    }
  }
  'dashboard.show_data': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['showData']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/dashboard_controller').default['showData']>>>
    }
  }
}
