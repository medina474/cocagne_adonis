import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'

export default class VerifyEmailMail extends BaseMail {
  
  static sendTo(email: string, host: string) {
    return mail.send(new VerifyEmailMail(email, host))
  }
  
  constructor(
    private email: string,
    private host: string
  ) {
    super()
  }
  
  from = 'noreply@example.com'
  subject = 'Confirmez votre adresse email'

  prepare() {
    this.message
      .to(this.email)
      .htmlView('emails/verify_email', {
        email: this.email,
        host: this.host,
      })
  }
}