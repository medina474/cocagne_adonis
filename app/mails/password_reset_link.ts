import { BaseMail } from '@adonisjs/mail'
import mail from '@adonisjs/mail/services/main'
import User from '#models/user'

export default class PasswordResetLink extends BaseMail {
  
  static sendTo(user: User, host: string) {
    return mail.send(new PasswordResetLink(user, host))
  }
  
  constructor(
    private user: User,
    private host: string
  ) {
    super()
  }
  
  from = 'noreply@example.com'
  subject = 'Réinitialisation du mot de passe'

  prepare() {
    this.message
      .to(this.user.email)
      .htmlView('emails/reset_password', {
        user: this.user,
        host: this.host,
      })
  }
}