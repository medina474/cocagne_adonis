import type { HttpContext } from '@adonisjs/core/http'
import Adherent from '#models/adherent'

export default class AdherentsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const adherents = await Adherent.all()
    return view.render('admin/adherents/index', { adherents })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/adherents/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['adherent'])
    await Adherent.create(data)
    return response.redirect().toRoute('admin_adherents.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const calendrier = await Adherent.findOrFail(params.id)
    return view.render('admin/adherents/show', { calendrier })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const calendrier = await Adherent.findOrFail(params.id)
    return view.render('admin/adherents/edit', { calendrier })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const calendrier = await Adherent.findOrFail(params.id)
    const data = request.only(['adherent'])
    calendrier.merge(data)
    await calendrier.save()
    return response.redirect().toRoute('admin_adherents.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const calendrier = await Adherent.findOrFail(params.id)
    await calendrier.delete()
    return response.redirect().toRoute('admin_adherents.index')
  }
}
