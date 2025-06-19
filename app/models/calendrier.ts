import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Saison from './saison.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Calendrier extends BaseModel {
  @column({ columnName: 'calendrier_id', isPrimary: true })
  declare id: number

  @column()
  declare calendrier: string

  @column()
  declare saisonId: number
  
  @belongsTo(() => Saison)
  declare panier: BelongsTo<typeof Saison>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}