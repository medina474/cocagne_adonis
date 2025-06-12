import { BaseMail } from '@adonisjs/mail'
import User from '#models/user'

export default class VerifyEmailNotification extends BaseMail {
  
  static sendTo(user: User, token: string, host: string) {
    return mail.send(new VerifyEmail(user, token, host))
  }
  
  constructor(
    private user: User,
    private token: string
    private host: string
  ) {
    super()
  }
  
  from = 'noreply@example.com'
  subject = 'Confirmez votre adresse email'

  prepare() {
    this.message
      .to(this.user.email)
      .htmlView('emails/verify_email', {
        user,
        token,
        host,
      })
  }
}