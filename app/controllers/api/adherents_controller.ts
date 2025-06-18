import Adherent from '#models/adherent'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdherentsController {
  /**
   * Display a list of resource
   */
  async index({response}: HttpContext) {
    const adherents = await Adherent.all()
    return response.ok(adherents)
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['adherent'])
    const adherent = await Adherent.create(data)
    return response.created(adherent)
  }

  /**
   * Show individual record
   */
  async show({ params, response }: HttpContext) {
    const adherent = await Adherent.findOrFail(params.id)
    return response.ok(adherent)
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const adherent = await Adherent.findOrFail(params.id)
    const data = request.only(['adherent'])
    adherent.merge(data)
    await adherent.save()
    return response.ok(adherent)
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const adherent = await Adherent.findOrFail(params.id)
    await adherent.delete()
    return response.noContent()
  }
}