import Saison from '#models/saison'
import type { HttpContext } from '@adonisjs/core/http'

export default class SaisonsController {
   /**
     * Display a list of resource
     */
    async index({ view }: HttpContext) {
      const saisons = await Saison.all()
      return view.render('admin/saisons/index', { saisons })
    }

    /**
     * Display form to create a new record
     */
    async create({ view }: HttpContext) {
      return view.render('admin/saisons/create')
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
      const data = request.only(['saison'])
      await Saison.create(data)
      return response.redirect().toRoute('admin.saisons.index')
    }

    /**
     * Show individual record
     */
    async show({ params, view }: HttpContext) {
      const saison = await Saison.query()
        .preload('feries')
        .preload('fermetures')
        .preload('cotisations')
        .where('saison', params.id)
        .firstOrFail()
      return view.render('admin/saisons/show', { saison })
    }

    /**
     * Edit individual record
     */
    async edit({ params, view }: HttpContext) {
      const saison = await Saison.findOrFail(params.id)
      return view.render('admin/saisons/edit', { saison })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
      //const isPatch = request.method() === 'PATCH'
      const profil = await Saison.findOrFail(params.id)
      const data = request.only(['saison'])
      profil.merge(data)
      await profil.save()
      return response.redirect().toRoute('admin.saisons.index')
    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
      const depot = await Saison.findOrFail(params.id)
      await depot.delete()
      return response.redirect().toRoute('admin.saisons.index')
    }
}
