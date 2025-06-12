import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'

export default class VerifyEmailMail extends BaseMail {
  
  static sendTo(user: User, token: string, host: string) {
    return mail.send(new VerifyEmailMail(user, token, host))
  }
  
  constructor(
    private user: User,
    private token: string,
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
        user: this.user,
        token: this.token,
        host: this.host,
      })
  }
}