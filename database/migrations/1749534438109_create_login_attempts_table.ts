import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'login_attempts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('ip_address')
      table.string('country').nullable()
      table.string('user_agent').nullable()
      table.boolean('suspicious').defaultTo(false)
      table.boolean('success').defaultTo(false)
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.timestamp('created_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}