import User from '#models/user'
import Post from '#models/depot'
import { Bouncer } from '@adonisjs/bouncer'

export const editDepot = Bouncer.ability((user: User, depot: Depot) => {
  return user.id === depot.userId
})
