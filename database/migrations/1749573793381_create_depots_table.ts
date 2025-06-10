import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'depots'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments()
      table.string('depot')
      table.timestamps()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}