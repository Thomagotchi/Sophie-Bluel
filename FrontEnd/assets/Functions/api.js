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
    const res = await fetch('http://localhost:5678/api/works/' + id, {
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
