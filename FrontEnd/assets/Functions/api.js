import { printAllWorks, resetInput, removeGalleryImages } from "./dom.js"

// Fonction pour récuperer tout les projéts en cours de la base de donnée 
export async function getAllProjects () {
    const allWorks = await fetch('http://localhost:5678/api/works', {
        method: 'GET',
        headers: {
            "Accept": "application/json"
        }
    })
    if (allWorks.ok) {
        return await allWorks.json()
    } else {
    throw new Error (`Impossible d'acceder au serveur`)
    }
} 

// Fonction pour supprimer un projét de la base de donnée 
export async function deleteProject(id) {
    const token = sessionStorage.getItem('token')
    const res = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: 'DELETE',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        }
    })
    if (res.ok) {
        console.log('item deleted')
    } else {
    throw new Error (`Impossible d'acceder au serveur`)
    }
}

// Fonction pour ajouter un projét de la base de donnée 
export async function sendWork(formData) {
    const token = sessionStorage.getItem('token')
    const addFileInput = document.getElementById('addFileInput')
    const addFileTitle = document.getElementById('addTitle') 
    const addFileCategorySelect = document.getElementById('categorySelect')    

    const res = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: formData
    })
    if(res.ok) {
        console.log('you successfully sent a project')
        resetInput(addFileInput)
        resetInput(addFileTitle)
        resetInput(addFileCategorySelect)
        removeGalleryImages()
        getAllProjects()
            .then(amountInDb => printAllWorks(amountInDb))
            .catch(e => {console.log('Cant find any images', e)})
    }
}
