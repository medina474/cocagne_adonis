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
import DepotsController from '#controllers/depots_controller'
import { HttpContext } from '@adonisjs/core/http'

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

router.get('forgot-password', [PasswordResetController, 'showForgotForm']).use(middleware.guest())
router.post('forgot-password', [PasswordResetController, 'sendResetLink'])

router.get('reset-password/:token', [PasswordResetController, 'showResetForm']).as('reset.password')
router.post('reset-password', [PasswordResetController, 'resetPassword'])

router.get('dashboard', async ({ view }) => view.render('pages/dashboard')) 
  .use(middleware.auth())

router.resource('depots', DepotsController)
