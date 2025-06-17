import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Fermeture from './fermeture.js'
import Ferie from './feries.js'
import Cotisation from './cotisation.js'

export default class Produit extends BaseModel {
  @column({ columnName: 'produit_id', isPrimary: true })
  declare id: number

  @column()
  declare produit: string
}
