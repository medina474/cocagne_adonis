import type { HttpContext } from '@adonisjs/core/http'
import Preparation from '#models/preparation'

export default class PreparationsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const preparations = await Preparation.all()
    return view.render('admin/preparations/index', { preparations })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/preparations/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['preparation'])
    await Preparation.create(data)
    return response.redirect().toRoute('admin.preparations.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const calendrier = await Preparation.findOrFail(params.id)
    return view.render('admin/preparations/show', { calendrier })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const calendrier = await Preparation.findOrFail(params.id)
    return view.render('admin/preparations/edit', { calendrier })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const calendrier = await Preparation.findOrFail(params.id)
    const data = request.only(['preparation'])
    calendrier.merge(data)
    await calendrier.save()
    return response.redirect().toRoute('admin.preparations.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const calendrier = await Preparation.findOrFail(params.id)
    await calendrier.delete()
    return response.redirect().toRoute('admin.preparations.index')
  }
}
