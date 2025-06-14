import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Fermeture extends BaseModel {
  @column({ columnName: 'fermeture_id', isPrimary: true })
  declare id: number

  @column()
  declare semaine: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
