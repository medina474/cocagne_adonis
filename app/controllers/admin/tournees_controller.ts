import type { HttpContext } from '@adonisjs/core/http'
import Tournee from '#models/tournee'

export default class tourneesController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const tournees = await Tournee.query().orderBy('ordre', 'asc')
    return view.render('admin/tournees/index', { tournees })
  }

  /**
   * Display form to create a new record
   */
  async create({ view }: HttpContext) {
    return view.render('admin/tournees/create')
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request, response }: HttpContext) {
    const data = request.only(['tournee'])
    await Tournee.create(data)
    return response.redirect().toRoute('admin.tournees.index')
  }

  /**
   * Show individual record
   */
  async show({ params, view }: HttpContext) {
    const tournee = await Tournee.findOrFail(params.id)
    return view.render('admin/tournees/show', { tournee })
  }

  /**
   * Edit individual record
   */
  async edit({ params, view }: HttpContext) {
    const tournee = await Tournee.findOrFail(params.id)
    return view.render('admin/tournees/edit', { tournee })
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const tournee = await Tournee.findOrFail(params.id)
    const data = request.only(['tournee'])
    tournee.merge(data)
    await tournee.save()
    return response.redirect().toRoute('admin.tournees.index')
  }

  /**
   * Delete record
   */
  async destroy({ params, response }: HttpContext) {
    const tournee = await Tournee.findOrFail(params.id)
    await tournee.delete()
    return response.redirect().toRoute('admin.tournees.index')
  }
}
