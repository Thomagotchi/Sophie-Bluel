// --- VARIABLES ----

//Galleries
const gallery = document.getElementById('gallery')
const triGallery = document.getElementById('tri-gallery')

// --- DOM MANIPULATION ---

//Activer un filtre
export async function toggleActive(e) {
    if (e.className == 'inactive') {
        e.setAttribute('class', 'active')  
    } else {
        return 
    }
}

//Desactiver un filtre
export async function toggleInactive(e) {
    if (e.className == 'active') {
        e.setAttribute('class', 'inactive')  
    } else {
        return 
    }
}

// Function to append Gallery Photos to DOM
function printGallery(e) {
    const newElement = document.createElement('figure')
    newElement.className = `cat-${e.category.id}`
    const elementImg = document.createElement('img')
    elementImg.setAttribute('src', e.imageUrl)
    elementImg.setAttribute('alt', e.title)
    const elementText = document.createElement('figcaption')
    elementText.innerText = e.title
    newElement.appendChild(elementImg)
    newElement.appendChild(elementText)
    gallery.appendChild(newElement)
}

//Function to print gallery filter to DOM
function printFilter(e, a) {
    const newLi = document.createElement('li')
    const newBtn = document.createElement('btn')
    const elementH3 = document.createElement('h3')
    const eId = e.split(' ')[0].toLowerCase()
    newBtn.setAttribute('id', eId)
    newBtn.className = a
    newLi.className = 'tri-button'
    elementH3.innerText = e
    newBtn.appendChild(elementH3)
    newLi.appendChild(newBtn)
    triGallery.appendChild(newLi)
}

//Ajoutez au DOM tout les projets
export async function printAllWorks(elements) {
    for (let element of elements) {
        printGallery(element)
    }
}

//Supprimez les images du DOM
export async function removeGalleryImages() {
    gallery.querySelectorAll('*').forEach(n => n.remove())
    console.log(gallery.childNodes)
}

// Ajoutez au DOM les projets filtrer
export async function printFilteredGallery(elements, i) {
    for (let element of elements) {
        if (element.category.id == i) {
            printGallery(element)
            console.log(elements)
        } 
    }
}

//Supprimez les filtres du DOM
function removeGalleryFilters() {
    gallery.querySelectorAll('*').forEach(n => n.remove())
    console.log(triGallery.childNodes)
}

//Fonction pour trouvez les filtres existant et les ajoutez au DOM
export async function findFilters(elements) {
    let eObjets = 0
    let eAppart = 0
    let eHotel = 0

    for (let element of elements) {
        if (element.category.id == 1) {eObjets++}
        if (element.category.id == 2) {eAppart++}
        if (element.category.id == 3) {eHotel++}
    }
    if (eObjets > 0 || eAppart > 0 || eHotel > 0) {
        printFilter('Tous', 'active')
    }
    if (eObjets > 0) {
        printFilter('Objets', 'inactive')
    }
    if (eAppart > 0) {
        printFilter('Appartements', 'inactive')
    }
    if (eHotel > 0) {
        printFilter('Hotel & restaurants', 'inactive')
    } else {
        console.log('Pas de projets en cours')
    }
}