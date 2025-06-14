import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Adhesion extends BaseModel {
  @column({ columnName: 'adhesion_id', isPrimary: true })
  declare id: number

  @column.dateTime()
  declare dateAdhesion: DateTime

  @column()
  declare montant: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
