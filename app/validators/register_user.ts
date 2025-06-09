import vine from '@vinejs/vine'

export const registerUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .trim()
      .email()
      .unique({ table: 'users', column: 'email' }),
    password: vine
      .string()
      .minLength(8)
      .maxLength(32)
      .regex(/[A-Z]/)     // au moins une majuscule
      .regex(/[a-z]/)     // au moins une minuscule
      .regex(/[0-9]/)     // au moins un chiffre
      .regex(/[^A-Za-z0-9]/) // au moins un caractère spécial
  })
)