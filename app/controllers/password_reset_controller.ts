import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { passwordValidator } from '#validators/password_validator'
import PasswordResetMail from '#mails/password_reset_mail'
import { RegistrationTokenService } from '#services/RegistrationTokenService'

export default class PasswordResetController {

  async sendResetLink({ request, response, session }: HttpContext) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (user) {
      PasswordResetMail.sendTo(email, `${request.protocol()}://${request.host()}`)
    }

    // Toujours afficher ce message pour éviter de révéler si un email existe
    session.flash('info', 'Si cet email existe, un lien vous a été envoyé.')
    return response.redirect('/forgot-password')
  }

  async showResetForm({ params, view, session, response, request }: HttpContext) {

    if (!request.hasValidSignature()) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    const user = await User.findBy('email', params.email)

    if (!user) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    const token = RegistrationTokenService.sign({ email: params.email })
    
    return view.render('auth/reset-password', { token })
  }

  async resetPassword({ request, response, session,params }: HttpContext) {

    const token = request.input('token') || params.token
    let data
    try {
      data = RegistrationTokenService.verify(token)
    } catch {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/register')
    }

    const payload = await request.validateUsing(passwordValidator)

    const user = await User.findBy('email', data.email)

    if (!user) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    await db.from('remember_me_tokens').where('tokenable_id', user.id).delete()
    
    user.password = payload.password
    await user.save()

    session.flash('info', 'Mot de passe réinitialisé.')
    return response.redirect('/login')
  }
}