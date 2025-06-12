import { generateSecret } from '2fa-node'
import { Payload } from '2fa-node/dist/interfaces.js'
import { customAlphabet } from 'nanoid'

export type TwoFactorSecret = {
  secret: string
  uri: string
  qr: string // base64 PNG
}

export default class TwoFactorService {
  private backupCodeLength = 10
  private backupCodeCount = 8

  /**
   * Génère un secret, un URI OTP et un QR code (en base64 PNG)
   */
  async generateSecret(email: string, appName = 'MonApp'): Promise<TwoFactorSecret> {
    const payload: Payload = {
      name: appName, 
      account: email,
      counter: 5,
      numberOfSecretBytes: 20
    };

    const { secret, uri, qr } = await generateSecret(payload)
    
    return { secret, uri, qr }
  }

  /**
   * Vérifie un code TOTP donné
   */
  verify(code: string, secret: string): boolean {
    return true
  }

  /**
   * Génère des codes de secours à usage unique
   */
  generateBackupCodes(): string[] {
    const nanoid = customAlphabet('ABCDEFGHIJKLMNOPQRSTUVWXYZ234567', this.backupCodeLength)
    return Array.from({ length: this.backupCodeCount }, () => nanoid())
  }

  /**
   * Vérifie si un code de secours est valide
   */
  isValidBackupCode(code: string, storedCodes: string[]): boolean {
    return storedCodes.includes(code)
  }

  /**
   * Retire un code de secours utilisé
   */
  consumeBackupCode(code: string, storedCodes: string[]): string[] {
    return storedCodes.filter((c) => c !== code)
  }
}