import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Abonnement from './abonnement.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Distribution from './distribution.js'
import Produit from './produit.js'
import Planning from './planning.js'

export default class Livraison extends BaseModel {
  @column({ columnName: 'livraison_id', isPrimary: true })
  declare id: number

  @column()
  declare abonnementId: number

  @belongsTo(() => Abonnement)
  declare saison: BelongsTo<typeof Abonnement>

  @column()
  declare distributionId: number

  @belongsTo(() => Distribution)
  declare distribution: BelongsTo<typeof Distribution>

  @column()
  declare produitId: number

  @belongsTo(() => Produit)
  declare produit: BelongsTo<typeof Produit>

  @column()
  declare planningId: number

  @belongsTo(() => Planning)
  declare planning: BelongsTo<typeof Planning>

  @column()
  declare qte: number

  @column()
  declare livre: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}