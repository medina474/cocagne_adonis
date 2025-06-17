import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Abonnement from './abonnement.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Distribution from './distribution.js'
import Produit from './produit.js'

export default class Livraison extends BaseModel {
  @column({ columnName: 'livraison_id', isPrimary: true })
  declare id: number

  @belongsTo(() => Abonnement)
  declare saison: BelongsTo<typeof Abonnement>

  @belongsTo(() => Distribution)
  declare distribution: BelongsTo<typeof Distribution>

  @belongsTo(() => Produit)
  declare produit: BelongsTo<typeof Produit>

  @belongsTo(() => Abonnement)
  declare planning: BelongsTo<typeof Abonnement>

  @column()
  declare qte: number

  @column()
  declare livre: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}