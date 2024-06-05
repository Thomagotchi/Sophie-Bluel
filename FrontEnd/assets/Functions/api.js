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

export async function supprimeProjet(id) {
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

export async function sendWork(formDataObject) {
    const token = sessionStorage.getItem('token')

    const res = await fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
        },
        body: formDataObject
    })
    if(res.ok) {
        console.log('you successfully sent a work')
    } 
}

// {
//     "id": 0,
//     "title": "string",
//     "imageUrl": "string",
//     "categoryId": "string",
//     "userId": 0
//   }