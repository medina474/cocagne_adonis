import type { HttpContext } from '@adonisjs/core/http'
import Depot from '#models/depot'
import Cotisation from '#models/cotisation'

export default class CotisationsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const cotisations = await Depot.all()
    return view.render('admin/cotisations/index', { cotisations })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/cotisations/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['cotisation'])
    await Cotisation.create(data)
    return response.redirect().toRoute('admin_cotisations.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    return view.render('admin/cotisations/show', { depot })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    return view.render('admin/cotisations/edit', { depot })
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
    return response.redirect().toRoute('admin_cotisations.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const depot = await Depot.findOrFail(params.id)
    await depot.delete()
    return response.redirect().toRoute('admin_cotisations.index')
  }
}
