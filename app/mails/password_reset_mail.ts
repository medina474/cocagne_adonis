import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'

export default class PasswordResetMail extends BaseMail {
  
  static sendTo(email: string, host: string) {
    return mail.send(new PasswordResetMail(email, host))
  }
  
  constructor(
    private email: string,
    private host: string
  ) {
    super()
  }
  
  from = 'noreply@example.com'
  subject = 'Réinitialisation du mot de passe'

  prepare() {
    this.message
      .to(this.email)
      .htmlView('emails/password_reset', {
        email: this.email,
        host: this.host,
      })
  }
}