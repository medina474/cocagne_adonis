import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Panier from './panier.js'
import Adherent from './adherent.js'
import Saison from './saison.js'

export default class Abonnement extends BaseModel {
  @column({ columnName: 'abonnement_id', isPrimary: true })
  declare id: number

  @belongsTo(() => Adherent)
  declare adherent: BelongsTo<typeof Adherent>

  @belongsTo(() => Panier)
  declare panier: BelongsTo<typeof Panier>

  @belongsTo(() => Saison)
  declare saison: BelongsTo<typeof Saison>

  @column()
  declare nombre: number

  @column()
  declare montant: number

  @column.dateTime()
  declare dateDebut: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
