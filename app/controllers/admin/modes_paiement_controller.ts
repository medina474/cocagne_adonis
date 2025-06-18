import ModePaiement from '#models/mode_paiement'
import type { HttpContext } from '@adonisjs/core/http'

export default class ModesPaiementController {
   /**
     * Display a list of resource
     */
    async index({ view }: HttpContext) {
      const fermetures = await ModePaiement.all()
      return view.render('admin/fermetures/index', { fermetures })
    }

    /**
     * Display form to create a new record
     */
    async create({ view }: HttpContext) {
      return view.render('admin/fermetures/create')
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
      const data = request.only(['semaine'])
      await ModePaiement.create(data)
      return response.redirect().toRoute('admin_fermetures.index')
    }

    /**
     * Show individual record
     */
    async show({ params, view }: HttpContext) {
      const depot = await ModePaiement.findOrFail(params.id)
      return view.render('admin/fermetures/show', { depot })
    }

    /**
     * Edit individual record
     */
    async edit({ params, view }: HttpContext) {
      const depot = await ModePaiement.findOrFail(params.id)
      return view.render('admin/fermetures/edit', { depot })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
      //const isPatch = request.method() === 'PATCH'
      const modePaiement = await ModePaiement.findOrFail(params.id)
      const data = request.only(['semaine'])
      modePaiement.merge(data)
      await modePaiement.save()
      return response.redirect().toRoute('admin_fermetures.index')
    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
      const depot = await ModePaiement.findOrFail(params.id)
      await depot.delete()
      return response.redirect().toRoute('admin_fermetures.index')
    }
}
