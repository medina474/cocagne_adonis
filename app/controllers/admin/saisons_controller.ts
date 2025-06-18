import Saison from '#models/saison'
import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

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
      return response.redirect().toRoute('admin_saisons.index')
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
      const saison = await Saison.query()
        .preload('feries')
        .preload('fermetures')
        .preload('cotisations')
        .where('saison', params.id)
        .firstOrFail()

     /* const dates: string[] = []
      let date = saison.dateDebut

      while (date <= saison.dateFin) {
        const iso = date.toISODate()
        dates.push(iso!)
        date = date.plus({ days: 1 })
      }*/

     
    const joursFeries = [
      '2025-01-01',
      '2025-04-21',
      '2025-05-01',
      '2025-05-08',
      '2025-05-29',
      '2025-07-14',
      '2025-08-15',
      '2025-11-01',
      '2025-11-11',
      '2025-12-25'
    ].map(date => DateTime.fromISO(date).toISODate())

    const calendrierParMois: Record<string, any[]> = {}

    let date = saison.dateDebut.startOf('week')

    while (date <= saison.dateFin.endOf('week')) {
      const semaine = {
        numero: date.weekNumber,
        jours: [] as any[]
      }

      for (let i = 0; i < 7; i++) {
        const current = date.plus({ days: i })

        let jour: any = {}
        if (current >= saison.dateDebut && current <= saison.dateFin) {
          jour.numero = current.day
          jour.iso = current.toISODate()
          jour.estFerie = joursFeries.includes(current.toISODate())
        }

        semaine.jours.push(jour)
      }

      const moisNom = date.setLocale('fr').toFormat('LLLL')
      if (!calendrierParMois[moisNom]) {
        calendrierParMois[moisNom] = []
      }
      calendrierParMois[moisNom].push(semaine)

      date = date.plus({ weeks: 1 })
    }

    // Séparer les mois en 2 colonnes
    const moisOrdre = [
      'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
      'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ]

    const moisGauche = moisOrdre.slice(0, 6).map(mois => ({
      nom: mois.charAt(0).toUpperCase() + mois.slice(1),
      semaines: calendrierParMois[mois] || []
    }))

    const moisDroite = moisOrdre.slice(6).map(mois => ({
      nom: mois.charAt(0).toUpperCase() + mois.slice(1),
      semaines: calendrierParMois[mois] || []
    }))


      return view.render('admin/saisons/edit', { saison, calendrier: [moisGauche, moisDroite] })
    }

    /**
     * Handle form submission for the edit action
     */
    async update({ params, request, response }: HttpContext) {
      //const isPatch = request.method() === 'PATCH'
      const saison = await Saison.findOrFail(params.id)
      const data = request.only(['saison', 'dateDebut', 'dateFin'])
      saison.merge(data)
      await saison.save()
      return response.redirect().toRoute('admin_saisons.index')
    }

    /**
     * Delete record
     */
    async destroy({ params, response }: HttpContext) {
      const depot = await Saison.findOrFail(params.id)
      await depot.delete()
      return response.redirect().toRoute('admin_saisons.index')
    }
}
