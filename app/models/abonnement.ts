import { DateTime } from 'luxon'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import User from './user.js'
import Panier from './panier.js'

export default class Abonnement extends BaseModel {
  @column({ columnName: 'abonnement_id', isPrimary: true })
  declare id: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Panier)
  declare panier: BelongsTo<typeof Panier>

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
