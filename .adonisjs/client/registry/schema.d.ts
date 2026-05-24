/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.user.registrarse': {
    methods: ["POST"]
    pattern: '/auth/registro'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['registrarse']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['registrarse']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'auth.access_token.store': {
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
  'auth.access_token.destroy': {
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
  'profile.profile.show': {
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
  'user.list_usuarios_insti': {
    methods: ["GET","HEAD"]
    pattern: '/usuarios/listar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['listUsuariosInsti']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['listUsuariosInsti']>>>
    }
  }
  'user.crear_usuario': {
    methods: ["POST"]
    pattern: '/usuarios/crear'
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
    pattern: '/usuarios/obtener/:userId'
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
    pattern: '/usuarios/actualizar/:userId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').actualizarUsuarioValidator)>>
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').actualizarUsuarioValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['actualizarUsuario']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['actualizarUsuario']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.reasignar_institucion_rol': {
    methods: ["PUT"]
    pattern: '/usuarios/reasignar/:userId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').reasignarValidator)>>
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').reasignarValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['reasignarInstitucionRol']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['reasignarInstitucionRol']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'user.baja_insti': {
    methods: ["PUT"]
    pattern: '/usuarios/bajaInst/:userId'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').bajaValidator)>>
      paramsTuple: [ParamValue]
      params: { userId: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/user').bajaValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/user_controller').default['bajaInsti']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/user_controller').default['bajaInsti']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"]
    pattern: '/departamento/listar'
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
    pattern: '/departamento/agregar'
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
    pattern: '/departamento/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/departamento').ingresarDepart)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/departamento').ingresarDepart)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['actualizarDepart']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/departamentos_controller').default['actualizarDepart']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'municipios.municipios_por_departamento': {
    methods: ["GET","HEAD"]
    pattern: '/departamento/:id/municipios'
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
    pattern: '/municipios/listar'
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
    pattern: '/municipios/agregar'
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
    pattern: '/municipios/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/municipio').ingresarMuni)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/municipio').ingresarMuni)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['actualizarMunicipio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/municipios_controller').default['actualizarMunicipio']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sectores.sectores_por_municipio': {
    methods: ["GET","HEAD"]
    pattern: '/municipios/:id/sectores'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['sectoresPorMunicipio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['sectoresPorMunicipio']>>>
    }
  }
  'problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"]
    pattern: '/problematica/listar'
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
    pattern: '/problematica/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/problematica').ingresarProblem)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/problematica').ingresarProblem)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['crearProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['crearProblematica']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'problematicas.actualizar_problematica': {
    methods: ["PUT"]
    pattern: '/problematica/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/problematica').ingresarProblem)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/problematica').ingresarProblem)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['actualizarProblematica']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/problematicas_controller').default['actualizarProblematica']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'instituciones.obtener_instituciones': {
    methods: ["GET","HEAD"]
    pattern: '/instituciones/listar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/instituciones_controller').default['obtenerInstituciones']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/instituciones_controller').default['obtenerInstituciones']>>>
    }
  }
  'instituciones.crear_institucion': {
    methods: ["POST"]
    pattern: '/instituciones/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/institucione').ingresarInstitu)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/institucione').ingresarInstitu)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/instituciones_controller').default['crearInstitucion']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/instituciones_controller').default['crearInstitucion']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'instituciones.actualizar_instituc': {
    methods: ["PUT"]
    pattern: '/instituciones/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/institucione').ingresarInstitu)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/institucione').ingresarInstitu)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/instituciones_controller').default['actualizarInstituc']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/instituciones_controller').default['actualizarInstituc']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reportes.obtener_reportes': {
    methods: ["GET","HEAD"]
    pattern: '/reportes/listar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['obtenerReportes']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['obtenerReportes']>>>
    }
  }
  'reportes.crear_reporte': {
    methods: ["POST"]
    pattern: '/reportes/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/reporte').ingresarReporte)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/reporte').ingresarReporte)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['crearReporte']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['crearReporte']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reportes.actualizar_reporte': {
    methods: ["PUT"]
    pattern: '/reportes/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/reporte').ingresarReporte)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/reporte').ingresarReporte)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['actualizarReporte']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['actualizarReporte']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'reportes.obtener_reporte_int': {
    methods: ["GET","HEAD"]
    pattern: '/reportes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['obtenerReporteInt']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/reportes_controller').default['obtenerReporteInt']>>>
    }
  }
  'sectores.obtener_sectores': {
    methods: ["GET","HEAD"]
    pattern: '/sectores/listar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectores']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectores']>>>
    }
  }
  'sectores.obtener_sector_id': {
    methods: ["GET","HEAD"]
    pattern: '/sectores/obtener/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectorId']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['obtenerSectorId']>>>
    }
  }
  'sectores.crear_sector': {
    methods: ["POST"]
    pattern: '/sectores/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['crearSector']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['crearSector']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'sectores.actualizar_sector': {
    methods: ["PUT"]
    pattern: '/sectores/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/sector').ingresarSector)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['actualizarSector']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/sectores_controller').default['actualizarSector']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'roles.obtener_rol': {
    methods: ["GET","HEAD"]
    pattern: '/roles/listar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['obtenerRol']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['obtenerRol']>>>
    }
  }
  'roles.obtener_rol_id': {
    methods: ["GET","HEAD"]
    pattern: '/roles/obtener/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['obtenerRolId']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['obtenerRolId']>>>
    }
  }
  'roles.crear_rol': {
    methods: ["POST"]
    pattern: '/roles/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/roles').ingresarRol)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/roles').ingresarRol)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['crearRol']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['crearRol']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'roles.actualizar_rol': {
    methods: ["PUT"]
    pattern: '/roles/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/roles').ingresarRol)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/roles').ingresarRol)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['actualizarRol']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/roles_controller').default['actualizarRol']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'deta_reporte.obtener_deta_reporte': {
    methods: ["GET","HEAD"]
    pattern: '/detalleReportes/listar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['obtenerDetaReporte']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['obtenerDetaReporte']>>>
    }
  }
  'deta_reporte.obtener_detalle_id': {
    methods: ["GET","HEAD"]
    pattern: '/detalleReportes/obtener/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['obtenerDetalleId']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['obtenerDetalleId']>>>
    }
  }
  'deta_reporte.crear_detalle_reporte': {
    methods: ["POST"]
    pattern: '/detalleReportes/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/detalleReporte').ingresarDetalleReporte)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/detalleReporte').ingresarDetalleReporte)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['crearDetalleReporte']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['crearDetalleReporte']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'deta_reporte.actualizar_detalle_reporte': {
    methods: ["PUT"]
    pattern: '/detalleReportes/actu/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/detalleReporte').actualizarDetalleReporteValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/detalleReporte').actualizarDetalleReporteValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['actualizarDetalleReporte']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/detaReporte_controller').default['actualizarDetalleReporte']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'dashboard.show_data': {
    methods: ["GET","HEAD"]
    pattern: '/dashboard/load'
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
