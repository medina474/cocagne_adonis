import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import { emailValidator } from '#validators/email_validator'
import { passwordValidator } from '#validators/password_validator'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import VerifyEmailMail from '#mails/verify_email_mail'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(emailValidator)
    VerifyEmailMail.sendTo(payload.email, `${request.protocol()}://${request.host()}`)
    return response.redirect('wait_verify')
  }

  async verifyEmail({ params, response, session, auth, request }: HttpContext) {
    
    if (!request.hasValidSignature()) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/register')
    }

    const user = await User.create({
      email: params.email,
      password: crypto.randomUUID() 
    })

    await user.save()
    await auth.use('web').login(user)

    return response.redirect('/signin')
  }

  async signin({ response, auth, request }: HttpContext) {
    const payload = await request.validateUsing(passwordValidator)
    const user = auth.user!
    user.password = payload.password
    await user.save()
    return response.redirect('dashboard')
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
    user.resetToken = null
    user.deletedAt = DateTime.now()
    await user.save()
    
    await auth.use('web').logout()

    session.flash('success', 'Votre compte a été supprimé')
    return response.redirect('/')
  }
}