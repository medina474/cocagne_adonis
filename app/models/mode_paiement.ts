import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Abonnement from './abonnement.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Distribution from './distribution.js'
import Produit from './produit.js'

export default class ModePaiement extends BaseModel {
  @column({ columnName: 'mode_paiement_id', isPrimary: true })
  declare id: number

 
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}