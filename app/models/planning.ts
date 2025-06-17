import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Fermeture from './fermeture.js'
import Ferie from './feries.js'
import Cotisation from './cotisation.js'
import Calendrier from './calendrier.js'

export default class Planning extends BaseModel {
  @column({ columnName: 'planning_id', isPrimary: true })
  declare id: number

  @belongsTo(() => Calendrier)
  declare calendrier: BelongsTo<typeof Calendrier>

  @column.dateTime()
  declare jour: DateTime
}
