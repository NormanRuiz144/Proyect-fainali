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

//Ruta super importante
router.get('/', () => {
  return { hello: 'world' }
})
// Grupo de autenticacion
router.group(() => {
  router
    .group(() => {
      router.post('resgistro', [controllers.User, 'registrarse'])
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
    .use(middleware.rolGuardia(['Admin']))
})
// rutas de Usuario
router
  .group(() => {
    router.get('/list', [controllers.User, 'listUsuariosInsti'])
    router.post('/crear', [controllers.User, 'crearUsuario'])
    router.get('/:userId', [controllers.User, 'buscarUsurioById'])
    router.put('/actualizar/:userId', [controllers.User, 'actualizarUsuario'])
    router.put('/reasignar/:userId', [controllers.User, 'reasignarInstitucionRol'])
    router.put('/bajaInst/:userId', [controllers.User, 'bajaInsti'])
    // router.delete('/dormirUsuario/:userId',[controllers.User, ''])
  })
  .prefix('/usuarios')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas de departamentos
router
  .group(() => {
    router.get('/listar', [controllers.Departamentos, 'obtenerDepartamentos'])
    router.post('/agregar', [controllers.Departamentos, 'crearDepartamento'])
    router.put('/actu/:id', [controllers.Departamentos, 'actualizarDepart'])
  })
  .prefix('departamento')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas de Municipios
router
  .group(() => {
    router.get('/listar', [controllers.Municipios, 'obtenerMunicipios'])
    router.post('/agregar', [controllers.Municipios, 'crearMunicipio'])
    router.put('/actu/:id', [controllers.Municipios, 'actualizarMunicipio'])
  })
  .prefix('municipios')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

//Rutas de Problematicas
router
  .group(() => {
    router.get('/listar', [controllers.Problematicas, 'obtenerProblematicas'])
    router.post('/agregar', [controllers.Problematicas, 'crearProblematica'])
    router.put('/actu/:id', [controllers.Problematicas, 'actualizarProblematica'])
  })
  .prefix('problematica')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// //Rutas de Instituciones
router
  .group(() => {
    router.get('/listar', [controllers.Instituciones, 'obtenerInstituciones'])
    router.post('/agregar', [controllers.Instituciones, 'crearInstitucion'])
    router.put('/actu/:id', [controllers.Instituciones, 'actualizarInstituc'])
  })
  .prefix('instituciones')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))

// Rutas de Reportes
router
  .group(() => {
    router
      .get('/listar', [controllers.Reportes, 'obtenerReportes'])
      .use(middleware.rolGuardia(['Admin']))
    router
      .post('/agregar', [controllers.Reportes, 'crearReporte'])
      .use(middleware.rolGuardia(['Admin', 'Usuario Ordinario']))
    router
      .put('/actualizar/:id', [controllers.Reportes, 'actualizarReporte'])
      .use(middleware.rolGuardia(['Admin', 'Usuario Ordinario']))
  })
  .prefix('reportes')
  .use(middleware.auth())

//Rutas Sectores//
router
  .group(() => {
    router.get('/listar', [controllers.Sectores, 'obtenerSectores'])
    router
      .get('/obtener/:id', [controllers.Sectores, 'obtenerSectorId'])
      .use(middleware.rolGuardia(['Admin']))
    router
      .post('/agregar', [controllers.Sectores, 'crearSector'])
      .use(middleware.rolGuardia(['Admin']))
    router
      .put('/actu/:id', [controllers.Sectores, 'actualizarSector'])
      .use(middleware.rolGuardia(['Admin']))
  })
  .prefix('sectores')
  .use(middleware.auth())

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
  .use(middleware.rolGuardia(['Admin']))

//RUTAS DETALLE REPORTE//
router
  .group(() => {
    router.get('/detalleReportes', [controllers.DetaReporte, 'obtenerDetaReporte'])
    router.get('/detalleReportes/:id', [controllers.DetaReporte, 'obtenerDetalleId'])
    router.post('/detalleReportes', [controllers.DetaReporte, 'crearDetalleReporte'])
    router.put('/detalleReportes/:id', [controllers.DetaReporte, 'actualizarDetalleReporte'])
  })
  .prefix('detalleReportes')
  .use(middleware.auth())
  .use(middleware.rolGuardia(['Admin']))
