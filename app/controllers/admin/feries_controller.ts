import type { HttpContext } from '@adonisjs/core/http'
import Ferie from '#models/feries'

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
    const data = request.only(['ferie'])
    await Ferie.create(data)
    return response.redirect().toRoute('admin_feries.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const ferie = await Ferie.findOrFail(params.id)
    return view.render('admin/feries/show', { ferie })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const ferie = await Ferie.findOrFail(params.id)
    return view.render('admin/feries/edit', { ferie })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const ferie = await Ferie.findOrFail(params.id)
    const data = request.only(['ferie'])
    ferie.merge(data)
    await ferie.save()
    return response.redirect().toRoute('admin_feries.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const ferie = await Ferie.findOrFail(params.id)
    await ferie.delete()
    return response.redirect().toRoute('admin_feries.index')
  }
}
