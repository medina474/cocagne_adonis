import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Frequence extends BaseModel {
  @column({ columnName: 'frequence_id', isPrimary: true })
  declare id: number

  @column()
  declare frequence: string
  
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
