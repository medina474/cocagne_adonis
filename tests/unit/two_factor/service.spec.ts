import { test } from '@japa/runner'
import logger from '@adonisjs/core/services/logger'
import TwoFactorService from "#services/TwoFactorService"

test.group('TwoFactorService', () => {
 
  const twoFA = new TwoFactorService()

  test('doit générer un secret TOTP avec QR code', async ({ assert }) => {
    
    const email = 'user@example.com'
    const appName = 'MonApp'

    const result = await twoFA.generateSecret(email)

    logger.info(result.uri)
    assert.match(result.secret, /^[A-Z2-7]{32,}$/)
   
    const uriRegex = new RegExp(
      `^otpauth://totp/${appName.replace(/ /g, '%20')}%3A${email.replace('@', '%40')}\\?secret=[A-Z2-7]{32,}&name=${appName.replace(/ /g, '%20')}$`
    )
    assert.match(result.uri, uriRegex)

    // QR code base64
    assert.match(result.qr, /^data:image\/png;base64,[A-Za-z0-9+/=]+$/)
  })

})
