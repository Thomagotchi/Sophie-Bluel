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

