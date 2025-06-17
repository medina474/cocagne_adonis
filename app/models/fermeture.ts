import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Saison from './saison.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Fermeture extends BaseModel {
  @column({ columnName: 'fermeture_id', isPrimary: true })
  declare id: number

  @column()
  declare semaine: string

  @column()
  declare saisonId: number
  
  @belongsTo(() => Saison)
  declare saison: BelongsTo<typeof Saison>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
