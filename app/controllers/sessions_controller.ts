import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class SessionsController {

  async showLogin({ view }: HttpContext) {
    return view.render('auth/login')
  }

  async login({ request, response, auth, session }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user, !!request.input('remember_me'))

      return response.redirect('/dashboard')
    } catch {
      session.flash('error', 'Email ou mot de passe incorrect.')
      return response.redirect().back()
    }
  }

  async logout({ auth, response }: HttpContext) {
    await auth.use('web').logout()
    return response.redirect('/')
  }

  async verify() {
    
  }
}
