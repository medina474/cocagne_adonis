import Depot from '#models/depot'
import type { HttpContext } from '@adonisjs/core/http'

export default class DepotsController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {
    const depots = await Depot.all()
    return response.ok(depots)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['depot', 'capacite'])
    const user = await Depot.create(data)
    return response.created(user)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const user = await Depot.findOrFail(params.id)
    return response.ok(user)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const user = await Depot.findOrFail(params.id)
    const data = request.only(['depot', 'capacite'])
    user.merge(data)
    await user.save()
    return response.ok(user)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const user = await Depot.findOrFail(params.id)
    await user.delete()
    return response.noContent()
  }
}