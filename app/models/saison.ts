import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Fermeture from './fermeture.js'
import Ferie from './feries.js'
import Cotisation from './cotisation.js'

export default class Saison extends BaseModel {
  @column({ columnName: 'saison_id', isPrimary: true })
  declare id: number

  @column()
  declare saison: string

  @column.dateTime()
  declare dateDebut: DateTime

  @column.dateTime()
  declare dateFin: DateTime

  @hasMany(() => Fermeture)
  declare fermetures: HasMany<typeof Fermeture>

  @hasMany(() => Ferie)
  declare feries: HasMany<typeof Ferie>

  @hasMany(() => Cotisation)
  declare cotisations: HasMany<typeof Cotisation>
}
