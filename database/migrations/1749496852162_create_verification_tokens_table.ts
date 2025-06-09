import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('verification_token').nullable()
      table.timestamp('verification_token_expires_at').nullable()
      table.timestamp('email_verified_at').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumns('verification_token', 'verification_token_expires_at', 'email_verified_at')
    })
  }
}