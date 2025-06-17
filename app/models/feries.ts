import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Saison from './saison.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Ferie extends BaseModel {
  @column({ columnName: 'ferie_id', isPrimary: true })
  declare id: number

  @column()
  declare ferie: string

  @column()
  declare saisonId: number
  
  @belongsTo(() => Saison)
  declare saison: BelongsTo<typeof Saison>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
