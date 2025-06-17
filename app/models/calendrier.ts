import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Calendrier extends BaseModel {
  @column({ columnName: 'calendrier_id', isPrimary: true })
  declare id: number

  @column()
  declare calendrier: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}