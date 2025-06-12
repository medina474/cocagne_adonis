import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'

export default class PasswordResetLink extends BaseMail {
  
  /*
  static sendTo(user: User, token: string, host: string) {
    return mail.send(new VerifyEmail(user, token, host))
  }
  */
  
  constructor(
    private user: User,
    private host: string
  ) {
    super()
  }
  
  from = 'noreply@example.com'
  subject = 'Confirmez votre adresse email'

  prepare() {
    this.message
      .to(this.user.email)
      .htmlView('emails/reset_password', {
        user: this.user,
        host: this.host,
      })
  }
}