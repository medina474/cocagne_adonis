import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Adherent from './adherent.js'
import Saison from './saison.js'

export default class Adhesion extends BaseModel {
  @column({ columnName: 'adhesion_id', isPrimary: true })
  declare id: number

  @belongsTo(() => Adherent)
  declare adherent: BelongsTo<typeof Adherent>

  @column.dateTime()
  declare dateAdhesion: DateTime

  @column()
  declare montant: number

  @belongsTo(() => Saison)
  declare panier: BelongsTo<typeof Saison>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
