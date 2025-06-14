import Profil from '#models/profil'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProfilsController {
   /**
     * Display a list of resource
     */
    async index({ view }: HttpContext) {
      const profils = await Profil.all()
      return view.render('admin/profils/index', { profils })
    }

    /**
     * Display form to create a new record
     */
    async create({ view }: HttpContext) {
      return view.render('admin/profils/create')
    }

    /**
     * Handle form submission for the create action
     */
    async store({ request, response }: HttpContext) {
      const data = request.only(['profil'])
      await Profil.create(data)
      return response.redirect('/admin/profils')
    }

    /**
     * Show individual record
     */
    async show({ params, view }: HttpContext) {
      const depot = await Profil.findOrFail(params.id)
      return view.render('admin/profils/show', { depot })
    }

    /**
     * Edit individual record
     */
    async edit({ params, view }: HttpContext) {
      const depot = await Profil.findOrFail(params.id)
      return view.render('admin/profils/edit', { depot })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
      //const isPatch = request.method() === 'PATCH'
      const profil = await Profil.findOrFail(params.id)
      const data = request.only(['profil'])
      profil.merge(data)
      await profil.save()
      return response.redirect('/admin/profils')
    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
      const depot = await Profil.findOrFail(params.id)
      await depot.delete()
      return response.redirect('/admin/profils')
    }
}
