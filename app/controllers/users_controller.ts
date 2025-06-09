import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import { registerUserValidator } from '#validators/register_user'
import mail from '@adonisjs/mail/services/main'

export default class UsersController {
    async register({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)

    const token = crypto.randomUUID()
    const expiresAt = DateTime.utc().plus({ hours: 24 })

    const user = await User.create({
      ...payload,
      verificationToken: token,
      verificationTokenExpiresAt: expiresAt,
    })

    await mail.send((message) => {
      message
        .to(user.email)
        .from('noreply@example.com')
        .subject('Confirmez votre adresse email')
        .htmlView('emails/verify_email', {
          user,
          token,
          request,
        })
    })

    session.flash('info', 'Un lien de vérification a été envoyé.')
    return response.redirect('/login')
  }

  async verifyEmail({ params, response, session }: HttpContext) {
    const user = await User.findBy('verificationToken', params.token)

    if (!user) {
      session.flash('error', 'Lien invalide.')
      return response.redirect('/login')
    }

    if (!user.verificationTokenExpiresAt || user.verificationTokenExpiresAt < DateTime.utc()) {
      session.flash('error', 'Le lien a expiré.')
      return response.redirect('/resend-verification')
    }

    user.verificationToken = null
    user.verificationTokenExpiresAt = null
    user.emailVerifiedAt = DateTime.utc()
    await user.save()

    session.flash('info', 'Email vérifié avec succès.')
    return response.redirect('/login')
  }
}