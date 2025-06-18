import { TabulatorFull  } from 'tabulator-tables'
import 'tabulator-tables/dist/css/tabulator_materialize.min.css'

document.addEventListener('DOMContentLoaded', () => {
  const data = window.tabulatorData ?? []
  new TabulatorFull('#example-table', {
    height:"600px",
    data: data,
    layout: 'fitColumns',
    columns: [
      { title: 'Nom', field: 'adherent', headerFilter:"input" },
      {
        title: 'Actions',
        headerSort: false,
        hozAlign: 'center',
        formatter: (cell) => {
          return `
            <button class="btn-edit" data-id="${cell.getData().id}">✏️</button>
            <button class="btn-delete" data-id="${cell.getData().id}">🗑️</button>
          `
        },
        cellClick: (e, cell) => {
          const target = e.target as HTMLElement
          const id = cell.getData().id

          if (target.classList.contains('btn-edit')) {
            window.location.href = `/api/adherent/${id}/edit`
          } else if (target.classList.contains('btn-delete')) {
            if (confirm(`Supprimer l'adhérent #${id} ?`)) {
              supprimerAdherent(id)
            }
          }
        },
      }
    ],
  })
})

// Exemple de suppression (à adapter selon votre backend)
async function supprimerAdherent(id: number) {
  try {
    const res = await fetch(`/api/adherents/${id}`, {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        // 'X-CSRF-TOKEN': 'votre_token_ici', // ajoutez si besoin
      },
    })

    console.log(res)
    if (!res.ok) throw new Error('Erreur lors de la suppression')
      
    alert(`Livraison #${id} supprimée`)
    // Supprime la ligne du tableau sans recharger
    cell.getRow()?.delete()
  } catch (error: any) {
    alert(`Erreur: ${error.message || error}`)
  }
}
