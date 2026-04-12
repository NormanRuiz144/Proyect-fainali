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
import DepartamentosController from '#controllers/departamentos_controller'
import MunicipiosController from '#controllers/municipios_controller'
import ProblematicasController from '#controllers/problematicas_controller'
import InstitucionesController from '#controllers/instituciones_controller'
import ReportesController from '#controllers/reportes_controller'
import SectoresController from '#controllers/sectores_controller'
import RolesController from '#controllers/roles_controller'
import detaReporteController from '#controllers/detaReporte_controller'
router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    router
      .group(() => {
        router.post('signup', [controllers.NewAccount, 'store'])
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
  .prefix('/api/v1')

// Rutas de departamentos
router.get('/departamento', [DepartamentosController, 'obtenerDepartamentos'])
router.post('/departamento', [DepartamentosController, 'crearDepartamento'])
router.put('/departamento/:id', [DepartamentosController, 'actualizarDepart'])

// Rutas de Municipios
router.get('/municipios', [MunicipiosController, 'obtenerDepartamentos'])
router.post('/municipios', [MunicipiosController, 'crearMunicipio'])
router.get('/municipios/:id', [MunicipiosController, 'actualizarMunicipio'])

//Rutas de Problematicas
router.get('/problematica',[ProblematicasController,'obtenerProblematicas'])
router.post('/problematica',[ProblematicasController,'crearProblematica'])
router.put('/problematica/:id',[ProblematicasController,'actualizarProblematica'])

// //Rutas de Problematicas
router.get('/instituciones',[InstitucionesController,'obtenerInstituciones'])
router.post('/instituciones',[InstitucionesController,'crearInstitucion'])
router.put('/instituciones/:id',[InstitucionesController,'actualizarInstituc'])

// Rutas de Reportes
router.get('/reportes', [ReportesController, 'obtenerReportes'])
router.post('/reportes', [ReportesController, 'crearReporte'])
router.put('/reportes/:id', [ReportesController, 'actualizarReporte'])

//Rutas Sectores//
router.get('/sectores',[SectoresController,'obtenerSectores'])
router.get('/sectores/:id',[SectoresController,'obtenerSectorId'])
router.post('/sectores',[SectoresController,'crearSector'])
router.put('/sectores/:id',[SectoresController,'actualizarSector'])

//RUTAS ROL//
router.get('/roles', [RolesController, 'obtenerRol'])
router.get('/roles/:id', [RolesController, 'obtenerRolId'])
router.post('/roles', [RolesController, 'crearRol'])
router.put('/roles/:id', [RolesController, 'actualizarRol'])

//RUTAS DETALLE REPORTE//

router.get('/detalleReportes',[detaReporteController,'obtenerDetaReporte'])
router.get('/detalleReportes/:id',[detaReporteController,'obtenerDetalleId'])
router.post('/detalleReportes',[detaReporteController,'crearDetalleReporte'])
router.put('/detalleReportes/:id',[detaReporteController,'actualizarDetalleReporte'])
