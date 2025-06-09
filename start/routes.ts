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

router.on('/').render('pages/home')

router.get('/dashboard', async ({ view }) => view.render('pages/dashboard')) 
  .use([
    middleware.auth()
  ])
