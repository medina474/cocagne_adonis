import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('verificationToken').nullable()
      table.timestamp('verificationTokenExpiresAt').nullable()
      table.timestamp('emailVerifiedAt').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('verificationToken', 'verificationTokenExpiresAt', 'emailVerifiedAt')
    })
  }
}