/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import AutoSwagger from '@rnwonder/adonis-autoswagger'
import swagger from '#config/swagger'

router.get('/swagger', async () => {
  return AutoSwagger.default.docs(router.toJSON(), swagger)
})

router.get('/docs', async () => {
  return AutoSwagger.default.ui('/swagger', swagger)
})

//Ruta super importante
router.get('/', () => {
  return { hello: 'world' }
})
// Grupo de autenticacion
router.group(() => {
  router
    .group(() => {
      router.post('registro', [controllers.User, 'registrarse'])
      router.post('login', [controllers.AccessToken, 'store'])
      router.post('logout', [controllers.AccessToken, 'destroy']).use(middleware.auth())
    })
    .prefix('auth')
    .as('auth')

  router
    .group(() => {
      router.get('/profile', [controllers.Profile, 'show'])
    })
    .prefix('account')
    .as('profile')
    .use(middleware.auth())
})
// rutas de Usuario
router
  .group(() => {
    router.get('/listar/pagina', [controllers.User, 'listUsuarios']).use(middleware.rolGuardia(['Super-Admin']))
    router.get('/listarInsti', [controllers.User, 'listUsuariosInsti']).use(middleware.rolGuardia(['Super-Admin']))
    router.post('/crear', [controllers.User, 'crearUsuario']).use(middleware.rolGuardia(['Super-Admin']))
    router.get('/obtener/:userId', [controllers.User, 'buscarUsurioById']).use(middleware.rolGuardia(['Super-Admin']))
    router.put('/actualizar/:userId', [controllers.User, 'actualizarUsuario']) // Allowed to all authenticated users
    router.put('/reasignar/:userId', [controllers.User, 'reasignarInstitucionRol']).use(middleware.rolGuardia(['Super-Admin']))
    router.put('/bajaInst/:userId', [controllers.User, 'bajaInsti']).use(middleware.rolGuardia(['Super-Admin']))
    // router.delete('/dormirUsuario/:userId',[controllers.User, ''])
  })
  .prefix('/usuarios')
  .use(middleware.auth())

// Rutas de departamentos
router
  .group(() => {
    router.get('/listar/pagina', [controllers.Departamentos, 'obtenerDepartamentos'])
    router.post('/agregar', [controllers.Departamentos, 'crearDepartamento'])
    // .use(middleware.auth())
    // .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router.put('/actu/:id', [controllers.Departamentos, 'actualizarDepart'])
    // .use(middleware.auth())
    // .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router.delete('/eliminar/:id', [controllers.Departamentos, 'eliminarDepartamento'])
    router.patch('/restaurar/:id', [controllers.Departamentos, 'restaurarDepartamento'])
  })
  .prefix('departamento')

router.get('/departamento/:id/municipios', [controllers.Municipios, 'municipiosPorDepartamento'])

// Rutas de Municipios
router
  .group(() => {
    router.get('/listar/pagina', [controllers.Municipios, 'obtenerMunicipios'])
    router.post('/agregar', [controllers.Municipios, 'crearMunicipio'])
    router.put('/actu/:id', [controllers.Municipios, 'actualizarMunicipio'])
    router.delete('/eliminar/:id', [controllers.Municipios, 'eliminarMunicipio'])
    router.patch('/restaurar/:id', [controllers.Municipios, 'restaurarMunicipio'])
  })
  .prefix('municipios')
// .use(middleware.auth())
// .use(middleware.rolGuardia(['Admin', 'Super-Admin']))

router.get('/municipios/:id/sectores', [controllers.Sectores, 'sectoresPorMunicipio'])

//Rutas de Problematicas
router
  .group(() => {
    router.get('/listar/pagina/', [controllers.Problematicas, 'obtenerProblematicas'])
    router
      .post('/agregar', [controllers.Problematicas, 'crearProblematica'])
      .use(middleware.auth())
      .use(middleware.rolGuardia(['Super-Admin']))
    router
      .put('/actu/:id', [controllers.Problematicas, 'actualizarProblematica'])
      .use(middleware.auth())
      .use(middleware.rolGuardia(['Super-Admin']))
    router.delete('/eliminar/:id', [controllers.Problematicas, 'eliminarProblematica'])
    router.patch('/restaurar/:id', [controllers.Problematicas, 'restaurarProblematica'])
    router.get('/filtrar/:idInst', [controllers.Problematicas, 'filtrarByInstitucion'])
    router.get('/listar-instituciones-asociadas/:idProb', [
      controllers.Problematicas,
      'listarInstitucionesAsociadas',
    ])
    router.post('/asignar', [controllers.Problematicas, 'asignarIntitucion'])
    router.delete('/eliminar-asociacion', [controllers.Problematicas, 'eliminarAsociacion'])
  })
  .prefix('problematica')

// //Rutas de Instituciones
router
  .group(() => {
    router.get('/listar/pagina', [controllers.Instituciones, 'obtenerInstituciones'])
    router.get('/obtener/:id', [controllers.Instituciones, 'institucionesPorMunicipio'])
    router
      .post('/agregar', [controllers.Instituciones, 'crearInstitucion'])
      .use(middleware.auth())
      .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router
      .put('/actu/:id', [controllers.Instituciones, 'actualizarInstituc'])
      .use(middleware.auth())
      .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router.delete('/eliminar/:id', [controllers.Instituciones, 'eliminarInstitucion'])
    router.patch('/restaurar/:id', [controllers.Instituciones, 'restaurarInstitucion'])
  })
  .prefix('instituciones')

// Rutas de Reportes

router
  .group(() => {
    router
      .get('/historial', [controllers.Reportes, 'historialUsuario'])
      .use(middleware.rolGuardia(['default', 'Admin', 'Super-Admin']))
    router
      .get('/listar', [controllers.Reportes, 'obtenerReportes'])
      .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router
      .post('/agregar', [controllers.Reportes, 'crearReporte'])
      .use(middleware.rolGuardia(['Admin', 'default', 'Super-Admin']))
    router
      .put('/actu/:id', [controllers.Reportes, 'actualizarReporte'])
      .use(middleware.rolGuardia(['Admin', 'default', 'Super-Admin']))
    router
      .patch('/estado/:id', [controllers.Reportes, 'actualizarEstadoReporte'])
      .use(middleware.rolGuardia(['Admin', 'default', 'Super-Admin']))
    router
      .get('/listarInst/:id', [controllers.Reportes, 'obtenerReporteInt'])
      .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
  })
  .prefix('reportes')
  .use(middleware.auth())

//Rutas Sectores//
router
  .group(() => {
    router.get('/listar/pagina', [controllers.Sectores, 'obtenerSectores'])
    router.get('/obtener/:id', [controllers.Sectores, 'obtenerSectorId'])
    // .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router.post('/agregar', [controllers.Sectores, 'crearSector'])
    // .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router.put('/actu/:id', [controllers.Sectores, 'actualizarSector'])
    // .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
    router.delete('/eliminar/:id', [controllers.Sectores, 'eliminarSector'])
    router.patch('/restaurar/:id', [controllers.Sectores, 'restaurarSector'])
  })
  .prefix('sectores')
// .use(middleware.auth())

//RUTAS ROL//
router
  .group(() => {
    router.get('/listar', [controllers.Roles, 'obtenerRol'])
    router.get('/obtener/:id', [controllers.Roles, 'obtenerRolId'])
    router.post('/agregar', [controllers.Roles, 'crearRol'])
    router.put('/actu/:id', [controllers.Roles, 'actualizarRol'])
  })
  .prefix('roles')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Super-Admin']))

//RUTAS DETALLE REPORTE//
router
  .group(() => {
    router.get('/listar', [controllers.DetaReporte, 'obtenerDetaReporte'])
    router.get('/obtener/:id', [controllers.DetaReporte, 'obtenerDetalleId'])
    router.post('/agregar', [controllers.DetaReporte, 'crearDetalleReporte'])
    router.put('/actu/:id', [controllers.DetaReporte, 'actualizarDetalleReporte'])
  })
  .prefix('detalleReportes')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas pal Dashboard
router
  .group(() => {
    router.get('/load', [controllers.Dashboard, 'showData'])
  })
  .prefix('dashboard')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin', 'Super-Admin']))
