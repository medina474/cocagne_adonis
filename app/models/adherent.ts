import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasOne } from '@adonisjs/lucid/orm'
import Profil from './profil.js'
import Depot from './depot.js'
import type { BelongsTo, HasOne } from '@adonisjs/lucid/types/relations'
import Adresse from './adresse.js'

export default class Adherent extends BaseModel {
  @column({ columnName: 'adherent_id', isPrimary: true })
  declare id: number

  @column()
  declare adherent: string

  @column()
  declare email: string

  @column()
  declare profilId: number

  @belongsTo(() => Profil)
  declare profil: BelongsTo<typeof Profil>

  @column()
  declare depotId: number

  @belongsTo(() => Depot)
  declare depot: BelongsTo<typeof Depot>

  @column()
  declare adresseId: number

  @hasOne(() => Adresse)
  declare adresse: HasOne<typeof Adresse>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
