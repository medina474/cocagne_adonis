import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Tournee extends BaseModel {
  @column({ columnName: 'tournee_id', isPrimary: true })
  declare id: number

  @column()
  declare tournee: string

  @column()
  declare ordre: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}