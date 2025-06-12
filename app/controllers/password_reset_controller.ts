import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { passwordValidator } from '#validators/password_validator'
import PasswordResetMail from '#mails/password_reset_mail'

export default class PasswordResetController {
  async showForgotForm({ view }: HttpContext) {
    return view.render('auth/forgot-password')
  }

  async sendResetLink({ request, response, session }: HttpContext) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (user) {
      user.resetToken = crypto.randomUUID()
      await user.save()

      PasswordResetMail.sendTo(user, `${request.protocol()}://${request.host()}`)
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

    const user = await User.findBy('resetToken', params.token)

    if (!user) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    return view.render('auth/reset-password', { token: params.token })
  }

  async resetPassword({ request, response, session }: HttpContext) {
    const { token } = request.only(['token'])
    const user = await User.findBy('resetToken', token)

    if (!user) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    const payload = await request.validateUsing(passwordValidator)

    await db.from('remember_me_tokens').where('tokenable_id', user.id).delete()
    
    user.password = payload.password
    user.resetToken = null
    await user.save()

    session.flash('info', 'Mot de passe réinitialisé.')
    return response.redirect('/login')
  }
}