import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import mail from '@adonisjs/mail/services/main'
import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'

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

      await mail.send((message) => {
        message
          .to(user.email)
          .from('noreply@example.com')
          .subject('Réinitialisation du mot de passe')
          .htmlView('emails/reset_password', {
            user,
            token: user.resetToken,
            request,
          })
      })
    }

    // Toujours afficher ce message pour éviter de révéler si un email existe
    session.flash('info', 'Si cet email existe, un lien vous a été envoyé.')
    return response.redirect('/forgot-password')
  }

  async showResetForm({ params, view, session, response }: HttpContext) {
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

    user.password = await hash.make(password)
    user.resetToken = null
    user.resetTokenExpiresAt = null
    await user.save()

    session.flash('info', 'Mot de passe réinitialisé.')
    return response.redirect('/login')
  }
}