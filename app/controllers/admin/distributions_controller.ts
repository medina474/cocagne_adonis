import type { HttpContext } from '@adonisjs/core/http'
import Distribution from '#models/distribution'

export default class DistributionsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const distributions = await Distribution.all()
    return view.render('admin/distributions/index', { distributions })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/distributions/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['distribution'])
    //await Cotisation.create(data)
    return response.redirect().toRoute('admin_distributions.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const depot = await Distribution.findOrFail(params.id)
    return view.render('admin/distributions/show', { depot })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const depot = await Distribution.findOrFail(params.id)
    return view.render('admin/distributions/edit', { depot })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const depot = await Distribution.findOrFail(params.id)
    const data = request.only(['depot'])
    //depot.merge(data)
    await depot.save()
    return response.redirect().toRoute('admin_distributions.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const depot = await Distribution.findOrFail(params.id)
    await depot.delete()
    return response.redirect().toRoute('admin_distributions.index')
  }
}
