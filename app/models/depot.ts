import { DateTime } from 'luxon'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Adresse from './adresse.js'
import Contact from './contact.js'

export default class Depot extends BaseModel {
  @column({ columnName: 'depot_id', isPrimary: true })
  declare id: number

  @column()
  declare depot: string

  @column()
  declare capacite: number

  @hasOne(() => Adresse)
  declare adresse: HasOne<typeof Adresse>

  @hasOne(() => Contact)
  declare contact: HasOne<typeof Contact>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoUpdate: true })
  declare updatedAt: DateTime
}
