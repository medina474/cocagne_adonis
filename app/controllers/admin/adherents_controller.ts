import type { HttpContext } from '@adonisjs/core/http'
import Adherent from '#models/adherent'
import Profil from '#models/profil'
import Adresse from '#models/adresse'
import db from '@adonisjs/lucid/services/db'


export default class AdherentsController {
  /**
   * Display a list of resource
   */
  async index({ view }: HttpContext) {
    const adherents = await Adherent.all()
    return view.render('admin/adherents/index', { adherents })
  }

  /**
   * Afficher le formulaire de création d'un nouvel adhérent
   */
  async create({ view }: HttpContext) {
    const profils = await Profil.all()
    return view.render('admin/adherents/create', { profils })
  }

  /**
   * Gérer la soumission du formulaire de création
   */
  async store({ request, response }: HttpContext) {
    await db.transaction(async (trx) => {
      const adresse_payload = request.only(['adresse', 'codepostal', 'ville'])
      const adresse = await Adresse.create(adresse_payload, { client: trx })

      const adherent_payload = request.only(['adherent', 'profil_id'])
      await Adherent.create({...adherent_payload, "adresseId": adresse.id}, { client: trx })
    })

    return response.redirect().toRoute('admin_adherents.index')
  }

  /**
   * Afficher un adhérent (en lecture seulement)
   */
  async show({ params, view }: HttpContext) {
    const adherent = await Adherent.query()
      .preload('adresse')
      .where('id', params.id)
      .firstOrFail()

    return view.render('admin/adherents/show', { adherent })
  }

  /**
   * Afficher le formulaire d'édition d'un adhérent
   */
  async edit({ params, view }: HttpContext) {
    const adherent = await Adherent.findOrFail(params.id)
    return view.render('admin/adherents/edit', { adherent })
  }

  /**
   * Gérer la soumission du formulaire d'édition
   */
  async update({ params, request, response }: HttpContext) {
    //const isPatch = request.method() === 'PATCH'
    const adherent = await Adherent.findOrFail(params.id)
    const data = request.only(['adherent'])
    adherent.merge(data)
    await adherent.save()
    return response.redirect().toRoute('admin_adherents.index')
  }

  /**
   * Supprimer un adhérent
   */
  async destroy({ params, response }: HttpContext) {
    const adherent = await Adherent.findOrFail(params.id)
    await adherent.delete()
    return response.redirect().toRoute('admin_adherents.index')
  }
}
