import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Adresse extends BaseModel {
  @column({ columnName: 'adresse_id', isPrimary: true })
  declare id: number

  @column()
  declare adresse: string

  @column()
  declare codePostal: string

  @column()
  declare ville: string

  @column()
  declare adherentId: number

  @column()
  declare depotId: number

  declare localisation: { lat: number, lng: number } | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime
}
