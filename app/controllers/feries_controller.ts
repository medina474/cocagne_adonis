import type { HttpContext } from '@adonisjs/core/http'
import Depot from '#models/feries'

export default class FeriesController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const feries = await Ferie.all()
    return view.render('admin/feries/index', { feries })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/feries/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['depot'])
    await Depot.create(data)
    return response.redirect('/admin/feries')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    return view.render('admin/feries/show', { depot })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    return view.render('admin/feries/edit', { depot })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const depot = await Depot.findOrFail(params.id)
    const data = request.only(['depot'])
    depot.merge(data)
    await depot.save()
    return response.redirect('/admin/feries')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    await depot.delete()
    return response.redirect('/admin/feries')
  }
}
