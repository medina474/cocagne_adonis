import type { HttpContext } from '@adonisjs/core/http'
import Panier from '#models/panier'

export default class paniersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const paniers = await Panier.query().orderBy('ordre', 'asc')
    return view.render('admin/paniers/index', { paniers })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/paniers/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['panier'])
    await Panier.create(data)
    return response.redirect().toRoute('admin.paniers.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const calendrier = await Panier.findOrFail(params.id)
    return view.render('admin/paniers/show', { calendrier })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const calendrier = await Panier.findOrFail(params.id)
    return view.render('admin/paniers/edit', { calendrier })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const calendrier = await Panier.findOrFail(params.id)
    const data = request.only(['panier'])
    calendrier.merge(data)
    await calendrier.save()
    return response.redirect().toRoute('admin.paniers.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const calendrier = await Panier.findOrFail(params.id)
    await calendrier.delete()
    return response.redirect().toRoute('admin.paniers.index')
  }
}
