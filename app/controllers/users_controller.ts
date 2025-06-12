import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import { registerUserValidator } from '#validators/register_user'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import VerifyEmailMail from '#mails/verify_email_mail'

export default class UsersController {
  async register({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(registerUserValidator)

    const token = crypto.randomUUID()

    const user = await User.create({
      ...payload,
      verificationToken: token
    })

    VerifyEmailMail.sendTo(user, token, `${request.protocol()}://${request.host()}`)

    session.flash('info', 'Un lien de vérification a été envoyé.')
    return response.redirect('/login')
  }

  async verifyEmail({ params, response, session, request }: HttpContext) {
    
    if (!request.hasValidSignature()) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/forgot-password')
    }

    const user = await User.findBy('verificationToken', params.token)

    if (!user) {
      session.flash('error', 'Lien invalide.')
      return response.redirect('/reset-password')
    }

    user.verificationToken = null
    user.emailVerifiedAt = DateTime.utc()
    await user.save()

    session.flash('info', 'Email vérifié avec succès.')
    return response.redirect('/login')
  }

  async edit({ params }: HttpContext) {

  }

  async destroy({ auth, request, session, response }: HttpContext) {
    const user = auth.user!
    const password = request.input('password')

    if (!password) {
      session.flash('error', 'Mot de passe incorrect')
      return response.redirect().back()
    }

    const isValidPassword = await hash.verify(user.password, password)
    if (!isValidPassword) {
      session.flash('error', 'Mot de passe incorrect')
      return response.redirect().back()
    }

    // Supprimer les tokens remember_me
    await db.from('remember_me_tokens').where('tokenable_id', user.id).delete()

    // Anonymiser les infos personnelles
    user.email = `deleted_${user.id}@anonymized.local`
    user.fullName = '** Utilisateur supprimé'
    user.password = crypto.randomUUID()
    user.emailVerifiedAt = null
    user.resetToken = null
    user.deletedAt = DateTime.now()
    await user.save()
    
    await auth.use('web').logout()

    session.flash('success', 'Votre compte a été supprimé')
    return response.redirect('/')
  }
}