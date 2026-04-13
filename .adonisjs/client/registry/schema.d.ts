/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'auth.user.registrarse': {
    methods: ["POST"]
    pattern: '/auth/resgistro'
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
    pattern: '/usuarios/list'
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
    pattern: '/departamento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'departamentos.crear_departamento': {
    methods: ["POST"]
    pattern: '/departamento'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'departamentos.actualizar_depart': {
    methods: ["PUT"]
    pattern: '/departamento/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'municipios.obtener_departamentos': {
    methods: ["GET","HEAD"]
    pattern: '/municipios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'municipios.crear_municipio': {
    methods: ["POST"]
    pattern: '/municipios'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'municipios.actualizar_municipio': {
    methods: ["PUT"]
    pattern: '/municipios/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"]
    pattern: '/problematica'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'problematicas.crear_problematica': {
    methods: ["POST"]
    pattern: '/problematica'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'problematicas.actualizar_problematica': {
    methods: ["PUT"]
    pattern: '/problematica/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'instituciones.obtener_instituciones': {
    methods: ["GET","HEAD"]
    pattern: '/instituciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'instituciones.crear_institucion': {
    methods: ["POST"]
    pattern: '/instituciones'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'instituciones.actualizar_instituc': {
    methods: ["PUT"]
    pattern: '/instituciones/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reportes.obtener_reportes': {
    methods: ["GET","HEAD"]
    pattern: '/reportes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reportes.crear_reporte': {
    methods: ["POST"]
    pattern: '/reportes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'reportes.actualizar_reporte': {
    methods: ["PUT"]
    pattern: '/reportes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
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
      response: unknown
      errorResponse: unknown
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
      response: unknown
      errorResponse: unknown
    }
  }
  'sectores.crear_sector': {
    methods: ["POST"]
    pattern: '/sectores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'sectores.actualizar_sector': {
    methods: ["PUT"]
    pattern: '/sectores/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'roles.obtener_rol': {
    methods: ["GET","HEAD"]
    pattern: '/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'roles.obtener_rol_id': {
    methods: ["GET","HEAD"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'roles.crear_rol': {
    methods: ["POST"]
    pattern: '/roles'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'roles.actualizar_rol': {
    methods: ["PUT"]
    pattern: '/roles/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'deta_reporte.obtener_deta_reporte': {
    methods: ["GET","HEAD"]
    pattern: '/detalleReportes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'deta_reporte.obtener_detalle_id': {
    methods: ["GET","HEAD"]
    pattern: '/detalleReportes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'deta_reporte.crear_detalle_reporte': {
    methods: ["POST"]
    pattern: '/detalleReportes'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'deta_reporte.actualizar_detalle_reporte': {
    methods: ["PUT"]
    pattern: '/detalleReportes/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
}
