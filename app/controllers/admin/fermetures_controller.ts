import Fermeture from '#models/fermeture'
import type { HttpContext } from '@adonisjs/core/http'

export default class FermeturesController {
   /**
     * Display a list of resource
     */
    async index({ view }: HttpContext) {
      const fermetures = await Fermeture.all()
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
      await Fermeture.create(data)
      return response.redirect('/admin/fermetures')
    }

    /**
     * Show individual record
     */
    async show({ params, view }: HttpContext) {
      const depot = await Fermeture.findOrFail(params.id)
      return view.render('admin/fermetures/show', { depot })
    }

    /**
     * Edit individual record
     */
    async edit({ params, view }: HttpContext) {
      const depot = await Fermeture.findOrFail(params.id)
      return view.render('admin/fermetures/edit', { depot })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
      //const isPatch = request.method() === 'PATCH'
      const profil = await Fermeture.findOrFail(params.id)
      const data = request.only(['semaine'])
      profil.merge(data)
      await profil.save()
      return response.redirect('/admin/fermetures')
    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
      const depot = await Fermeture.findOrFail(params.id)
      await depot.delete()
      return response.redirect('/admin/fermetures')
    }
}
