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

router.on('/').render('pages/home')

router.get('/login', [SessionsController, 'showLogin']).use(middleware.guest())
router.post('/login', [SessionsController, 'login'])
router.post('/logout', [SessionsController, 'logout']).use(middleware.auth())

router.get('/register', async ({ view }) => view.render('auth/register'))
router.post('/register', [UsersController, 'register'])
router.get('/verify/:token', [UsersController, 'verifyEmail'])

router.get('/forgot-password', [PasswordResetController, 'showForgotForm'])
router.post('/forgot-password', [PasswordResetController, 'sendResetLink'])

router.get('/reset-password/:token', [PasswordResetController, 'showResetForm']) .as('reset.password')
router.post('/reset-password', [PasswordResetController, 'resetPassword'])

router.get('/dashboard', async ({ view }) => view.render('pages/dashboard')) 
  .use(middleware.auth())
