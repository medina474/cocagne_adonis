import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ferie extends BaseModel {
  @column({ columnName: 'ferie_id', isPrimary: true })
  declare id: number

  @column()
  declare ferie: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
