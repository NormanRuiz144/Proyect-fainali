/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.new_account.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/signup',
    tokens: [{"old":"/api/v1/auth/signup","type":0,"val":"api","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['auth.new_account.store']['types'],
  },
  'auth.access_token.store': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.access_token.store']['types'],
  },
  'auth.access_token.destroy': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.access_token.destroy']['types'],
  },
  'profile.profile.show': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/account/profile',
    tokens: [{"old":"/api/v1/account/profile","type":0,"val":"api","end":""},{"old":"/api/v1/account/profile","type":0,"val":"v1","end":""},{"old":"/api/v1/account/profile","type":0,"val":"account","end":""},{"old":"/api/v1/account/profile","type":0,"val":"profile","end":""}],
    types: placeholder as Registry['profile.profile.show']['types'],
  },
  'departamentos.obtener_departamentos': {
    methods: ["GET","HEAD"],
    pattern: '/departamento',
    tokens: [{"old":"/departamento","type":0,"val":"departamento","end":""}],
    types: placeholder as Registry['departamentos.obtener_departamentos']['types'],
  },
  'departamentos.crear_departamento': {
    methods: ["POST"],
    pattern: '/departamento',
    tokens: [{"old":"/departamento","type":0,"val":"departamento","end":""}],
    types: placeholder as Registry['departamentos.crear_departamento']['types'],
  },
  'departamentos.actualizar_depart': {
    methods: ["PUT"],
    pattern: '/departamento/:id',
    tokens: [{"old":"/departamento/:id","type":0,"val":"departamento","end":""},{"old":"/departamento/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['departamentos.actualizar_depart']['types'],
  },
  'municipios.obtener_departamentos': {
    methods: ["GET","HEAD"],
    pattern: '/municipios',
    tokens: [{"old":"/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['municipios.obtener_departamentos']['types'],
  },
  'municipios.crear_municipio': {
    methods: ["POST"],
    pattern: '/municipios',
    tokens: [{"old":"/municipios","type":0,"val":"municipios","end":""}],
    types: placeholder as Registry['municipios.crear_municipio']['types'],
  },
  'municipios.actualizar_municipio': {
    methods: ["GET","HEAD"],
    pattern: '/municipios/:id',
    tokens: [{"old":"/municipios/:id","type":0,"val":"municipios","end":""},{"old":"/municipios/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['municipios.actualizar_municipio']['types'],
  },
  'problematicas.obtener_problematicas': {
    methods: ["GET","HEAD"],
    pattern: '/problematica',
    tokens: [{"old":"/problematica","type":0,"val":"problematica","end":""}],
    types: placeholder as Registry['problematicas.obtener_problematicas']['types'],
  },
  'problematicas.crear_problematica': {
    methods: ["POST"],
    pattern: '/problematica',
    tokens: [{"old":"/problematica","type":0,"val":"problematica","end":""}],
    types: placeholder as Registry['problematicas.crear_problematica']['types'],
  },
  'problematicas.actualizar_problematica': {
    methods: ["PUT"],
    pattern: '/problematica/:id',
    tokens: [{"old":"/problematica/:id","type":0,"val":"problematica","end":""},{"old":"/problematica/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['problematicas.actualizar_problematica']['types'],
  },
  'instituciones.obtener_instituciones': {
    methods: ["GET","HEAD"],
    pattern: '/instituciones',
    tokens: [{"old":"/instituciones","type":0,"val":"instituciones","end":""}],
    types: placeholder as Registry['instituciones.obtener_instituciones']['types'],
  },
  'instituciones.crear_institucion': {
    methods: ["POST"],
    pattern: '/instituciones',
    tokens: [{"old":"/instituciones","type":0,"val":"instituciones","end":""}],
    types: placeholder as Registry['instituciones.crear_institucion']['types'],
  },
  'instituciones.actualizar_instituc': {
    methods: ["PUT"],
    pattern: '/instituciones/:id',
    tokens: [{"old":"/instituciones/:id","type":0,"val":"instituciones","end":""},{"old":"/instituciones/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['instituciones.actualizar_instituc']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
