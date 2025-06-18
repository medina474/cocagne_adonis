/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import SessionsController from '#controllers/sessions_controller'
import UsersController from '#controllers/users_controller'
import PasswordResetController from '#controllers/password_reset_controller'

// Admin
const AdherentsController = () => import('#controllers/admin/adherents_controller')
const DepotsController = () => import('#controllers/admin/depots_controller')
const SaisonsController = () => import('#controllers/admin/saisons_controller')
const FermeturesController = () => import('#controllers/admin/fermetures_controller')
const ProfilsController = () => import('#controllers/admin/profils_controller')
const PreparationsController = () => import('#controllers/admin/preparations_controller')
const CotisationsController = () => import('#controllers/admin/cotisations_controller')
const TourneesController = () => import('#controllers/admin/tournees_controller')
const CalendriersController = () => import('#controllers/admin/calendriers_controller')

// API
const ApiDepotsController = () => import('#controllers/api/depots_controller')
const ApiAdherentsController = () => import('#controllers/api/adherents_controller')

router.on('/').render('pages/home')

router.on('login').render('sessions/login').use(middleware.guest())
router.post('login', [SessionsController, 'login'])
router.post('logout', [SessionsController, 'logout']).use(middleware.auth())

router.on('register').render('auth/register').use(middleware.guest())
router.post('register', [UsersController, 'register'])
router.on('wait_verify').render('auth/wait_verify').use(middleware.guest())
router.get('verify/:email', [UsersController, 'verifyEmail']).as('verify')
router.get('signin/:token', [UsersController, 'showSiginForm']).use(middleware.guest()).as('signin.form')
router.post('signin', [UsersController, 'signin']).as('signin')
router.post('delete', [UsersController, 'destroy']).use(middleware.auth())

router.on('forgot-password').render('auth/forgot-password').use(middleware.guest())
router.post('forgot-password', [PasswordResetController, 'sendResetLink'])

router.get('reset-password/:email', [PasswordResetController, 'showResetForm']).as('reset.password')
router.post('reset-password', [PasswordResetController, 'resetPassword'])

router.group(() => {
  router.get('dashboard', async ({ view }) => view.render('admin/dashboard'))
  router.resource('users', UsersController).as('admin.users')
  router.resource('adherents', AdherentsController).as('admin.adherents')
  router.resource('profils', ProfilsController).as('admin.profils')
  router.resource('depots', DepotsController).as('admin.depots')
  router.resource('saisons', SaisonsController).as('admin.saisons')
  router.resource('fermetures', FermeturesController).as('admin.fermetures')
  router.resource('calendriers', CalendriersController).as('admin.calendriers')
  router.resource('cotisations', CotisationsController).as('admin.cotisations')
  router.resource('preparations', PreparationsController).as('admin.preparations')
  router.resource('tournees', TourneesController).as('admin.tournees')
}).prefix('/admin').use(middleware.auth())

router.group(() => {
  router.resource('adherents', ApiAdherentsController).as('api.adherents').apiOnly()
  router.resource('depots', ApiDepotsController).as('api.depots').apiOnly()
  router.resource('saisons', ApiDepotsController).as('api.saisons').apiOnly()
  router.resource('fermetures', ApiDepotsController).as('api.fermetures').apiOnly()
}).prefix('/api').use(middleware.auth())
