import env from "#start/env"
import jwt from 'jsonwebtoken'

const SECRET = env.get('REGISTRATION_TOKEN_SECRET', 'votre-cle-secrete-super-longue')

export class RegistrationTokenService {
  static sign(payload: { email: string }): string {
    return jwt.sign(payload, SECRET, { expiresIn: '10m' })
  }

  static verify(token: string): { email: string } {
    return jwt.verify(token, SECRET) as { email: string }
  }
}
