import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Fery extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare ferie: string

  @column.dateTime()
  declare jour: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}