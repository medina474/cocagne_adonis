import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Saison from './saison.js'
import Profil from './profil.js'

export default class Cotisation extends BaseModel {
  @column({ columnName: 'cotisation_id', isPrimary: true })
  declare id: number

  @column()
  declare saisonId: number
  
  @belongsTo(() => Saison)
  declare saison: BelongsTo<typeof Saison>

  @belongsTo(() => Profil)
  declare profil: BelongsTo<typeof Profil>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
