import type { HttpContext } from '@adonisjs/core/http'
import Calendrier from '#models/calendrier'

export default class CalendriersController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const calendriers = await Calendrier.all()
    return view.render('admin/calendriers/index', { calendriers })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/calendriers/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['calendrier'])
    await Calendrier.create(data)
    return response.redirect().toRoute('admin_calendriers.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const calendrier = await Calendrier.findOrFail(params.id)
    return view.render('admin/calendriers/show', { calendrier })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const calendrier = await Calendrier.findOrFail(params.id)
    return view.render('admin/calendriers/edit', { calendrier })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const calendrier = await Calendrier.findOrFail(params.id)
    const data = request.only(['calendrier'])
    calendrier.merge(data)
    await calendrier.save()
    return response.redirect().toRoute('admin_calendriers.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const calendrier = await Calendrier.findOrFail(params.id)
    await calendrier.delete()
    return response.redirect().toRoute('admin_calendriers.index')
  }
}
