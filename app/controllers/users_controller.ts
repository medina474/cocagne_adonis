import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import User from '#models/user'
import { emailValidator } from '#validators/email_validator'
import { passwordValidator } from '#validators/password_validator'
import db from '@adonisjs/lucid/services/db'
import hash from '@adonisjs/core/services/hash'
import VerifyEmailMail from '#mails/verify_email_mail'
import { RegistrationTokenService } from '#services/RegistrationTokenService'

export default class UsersController {
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(emailValidator)
    VerifyEmailMail.sendTo(payload.email, `${request.protocol()}://${request.host()}`)
    return response.redirect('wait_verify')
  }

  async verifyEmail({ params, response, session, request }: HttpContext) {

    if (!request.hasValidSignature()) {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/register')
    }

    const token = RegistrationTokenService.sign({ email: params.email })

    return response.redirect().toRoute('signin.form', { token })
  }

  async showSiginForm({ view, params }: HttpContext) {
    return view.render("auth/signin", params)
  }

  async signin({ response, session, params, auth, request }: HttpContext) {

    const token = request.input('token') || params.token
    let data
    try {
      data = RegistrationTokenService.verify(token)
    } catch {
      session.flash('error', 'Lien invalide ou expiré.')
      return response.redirect('/register')
    }

    const payload = await request.validateUsing(passwordValidator)

    const user = await User.create({
      email: data.email,
      password: payload.password
    })

    await auth.use('web').login(user)
    return response.redirect('admin/dashboard')
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
    user.password = crypto.randomUUID()
    user.deletedAt = DateTime.now()
    await user.save()

    await auth.use('web').logout()

    session.flash('success', 'Votre compte a été supprimé')
    return response.redirect('/')
  }
}
