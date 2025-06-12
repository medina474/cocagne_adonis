import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { DateTime } from 'luxon'
import db from '@adonisjs/lucid/services/db'
import { registerUserValidator } from '#validators/register_user'
import PasswordResetlink from '#mails/password_reset_link'

export default class PasswordResetController {
  async showForgotForm({ view }: HttpContext) {
    return view.render('auth/forgot-password')
  }

  async sendResetLink({ request, response, session }: HttpContext) {
    const email = request.input('email')
    const user = await User.findBy('email', email)

    if (user) {
      user.resetToken = crypto.randomUUID()
      user.resetTokenExpiresAt = DateTime.utc().plus({ hours: 1 })
      await user.save()

      PasswordResetlink.sendTo(user, `${request.protocol()}://${request.host()}`)
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

    if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt < DateTime.utc()) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    return view.render('auth/reset-password', { token: params.token })
  }

  async resetPassword({ request, response, session }: HttpContext) {
    const { token, password } = request.only(['token', 'password'])
    const user = await User.findBy('resetToken', token)

    if (!user || !user.resetTokenExpiresAt || user.resetTokenExpiresAt < DateTime.utc()) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    const payload = await request.validateUsing(registerUserValidator)

    await db.from('remember_me_tokens').where('tokenable_id', user.id).delete()
    
    user.password = password
    user.resetToken = null
    user.resetTokenExpiresAt = null
    await user.save()

    session.flash('info', 'Mot de passe réinitialisé.')
    return response.redirect('/login')
  }
}