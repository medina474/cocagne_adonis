import type { HttpContext } from '@adonisjs/core/http'
import Depot from '#models/depot'

export default class DepotsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const depots = Depot.all()
    return view.render('depots/index', { depots })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('depots/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['depot'])
    await Depot.create(data)
    return response.redirect('/depots')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    return view.render('depots/edit', { depot })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    return view.render('depots/edit', { depot })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    const data = request.only(['depot'])
    depot.merge(data)
    await depot.save()
    return response.redirect('/depots')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    await depot.delete()
    return response.redirect('/depots')
  }
}