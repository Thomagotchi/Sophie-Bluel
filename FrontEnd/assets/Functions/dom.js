import { getAllProjects, supprimeProjet } from "./api.js"
// --- VARIABLES ----
// Portfolio
const portfolio = document.getElementById('portfolio')

// Modal 'modifier'


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
    const elementImg = document.createElement('img')
    const elementText = document.createElement('figcaption')

    newElement.className = `cat-${e.category.id}`
    newElement.setAttribute('id', e.id)
    elementImg.setAttribute('src', e.imageUrl)
    elementImg.setAttribute('alt', e.title)
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
}

// Ajoutez au DOM les projets filtrer
export async function printFilteredGallery(elements, i) {
    for (let element of elements) {
        if (element.category.id == i) {
            printGallery(element, gallery)
        } 
    }
}

//Supprimez les filtres du DOM
export async function removeGalleryFilters() {
    triGallery.querySelectorAll('*').forEach(n => n.remove())
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

// Créer module 'modifier'
export async function createModuleModifier() {
    const newAside = document.createElement('aside')
    const modalWrapper = document.createElement('div')
    const boutonsAction = document.createElement('div')
    const boutonFermer = document.createElement('button')
    const iconFermer = document.createElement('i')
    const titreModal = document.createElement('h3')
    const galleryDiv = document.createElement('div')
    const seperateur = document.createElement('div')
    const boutonAjout = document.createElement('button')
    const boutonSubmit = document.createElement('button')

    newAside.setAttribute('id', 'modifierModal')
    newAside.setAttribute('class', 'modifierModal')
    newAside.setAttribute('aria-hidden', 'false')
    newAside.setAttribute('role', 'dialog')
    newAside.setAttribute('aria-labelledby', 'titreModal')
    modalWrapper.setAttribute('class', 'modal-wrapper')
    boutonsAction.setAttribute('class', 'modalBoutonsAction')
    boutonFermer.setAttribute('id', 'boutonFermer')
    iconFermer.setAttribute('class', 'fa-xl fa-solid fa-xmark')
    titreModal.setAttribute('id', 'titreModal')
    titreModal.innerText = 'Galerie photo'
    galleryDiv.setAttribute('id', 'modalGallery')
    seperateur.setAttribute('class', 'seperateur')

    boutonAjout.setAttribute('id', 'boutonAjout')
    boutonAjout.innerText = 'Ajouter une photo'

    boutonAjout.addEventListener('click', () => {
        const backIcon = document.createElement('i')
        const formDiv = document.createElement('div')
        const ajoutForm = document.createElement('form')
        const ajoutFileInputDiv = document.createElement('div')
        const ajoutFileInput = document.createElement('input')
        const ajoutFileInputIcon = document.createElement('icon')
        const ajoutFileInputButton = document.createElement('button')
        const ajoutFileInputInfo = document.createElement('p')
        const ajoutFileTitleLabel = document.createElement('label')
        const ajoutFileTitle = document.createElement('input')
        const ajoutFileCategorieLabel = document.createElement('label')
        const ajoutFileCategorieSelect = document.createElement('select')
        const ajoutFileSelectCat0 = document.createElement('option')
        const ajoutFileSelectCat1 = document.createElement('option')
        const ajoutFileSelectCat2 = document.createElement('option')
        const ajoutFileSelectCat3 = document.createElement('option')

        backIcon.setAttribute('class', 'fa-solid fa-arrow-left')
        titreModal.innerText = 'Ajout photo'
        formDiv.setAttribute('class', 'formDiv')
        ajoutForm.setAttribute('id', 'ajoutForm')
        ajoutFileInputIcon.setAttribute('class', 'fa-regular fa-image')
        ajoutFileInputIcon.setAttribute('id', 'ajoutFileInputIcon')
        ajoutFileInputButton.setAttribute('id', 'ajoutFileInputButton')
        ajoutFileInputButton.innerText = '+ Ajouter photo'
        ajoutFileInputInfo.innerText = 'jpg, png: 4mo max'
        ajoutFileInput.setAttribute('type', 'file')
        ajoutFileInput.setAttribute('name', 'ajoutImage')
        ajoutFileInput.setAttribute('id', 'ajoutFileInput')
        ajoutFileCategorieLabel.innerText = 'Catégorie'
        ajoutFileCategorieSelect.setAttribute('id', 'categorySelect')
        ajoutFileSelectCat1.setAttribute('value', '0')
        ajoutFileSelectCat1.innerText = ''
        ajoutFileSelectCat1.setAttribute('value', '1')
        ajoutFileSelectCat1.innerText = 'Objets'
        ajoutFileSelectCat2.setAttribute('value', '2')
        ajoutFileSelectCat2.innerText = 'Appartements'
        ajoutFileSelectCat3.setAttribute('value', '3')
        ajoutFileSelectCat3.innerText = 'Hotels & restaurants'
        ajoutFileTitleLabel.setAttribute('for', 'titre')
        ajoutFileTitleLabel.innerText = 'Titre'
        ajoutFileTitle.setAttribute('name', 'titre')
        ajoutFileTitle.setAttribute('id', 'ajoutTitre')
        boutonSubmit.setAttribute('id', 'boutonSubmit')
        boutonSubmit.innerText = 'Valider'
        
        boutonSubmit.setAttribute('form', 'ajoutForm')
        boutonSubmit.setAttribute('type', 'submit')
        
        boutonSubmit.addEventListener('click', () => {

        })

        backIcon.addEventListener('click', () => {
            portfolio.removeChild(newAside)
            createModuleModifier()
        })
        
        modalWrapper.removeChild(galleryDiv)
        modalWrapper.removeChild(boutonAjout)
        boutonsAction.appendChild(backIcon)
        ajoutFileInputDiv.appendChild(ajoutFileInput)
        ajoutFileInputDiv.appendChild(ajoutFileInputIcon)
        ajoutFileInputDiv.appendChild(ajoutFileInputButton)
        ajoutFileInputDiv.appendChild(ajoutFileInputInfo)
        ajoutFileCategorieSelect.appendChild(ajoutFileSelectCat0)
        ajoutFileCategorieSelect.appendChild(ajoutFileSelectCat1)
        ajoutFileCategorieSelect.appendChild(ajoutFileSelectCat2)
        ajoutFileCategorieSelect.appendChild(ajoutFileSelectCat3)
        formDiv.appendChild(ajoutFileInputDiv)
        formDiv.appendChild(ajoutFileTitleLabel)
        formDiv.appendChild(ajoutFileTitle)
        formDiv.appendChild(ajoutFileCategorieLabel)
        formDiv.appendChild(ajoutFileCategorieSelect)
        formDiv.appendChild(ajoutFileInput)
        modalWrapper.insertBefore(formDiv, seperateur)
        modalWrapper.appendChild(boutonSubmit)
    })

    boutonFermer.addEventListener('click', () => {
        portfolio.removeChild(newAside)
    })

    modalWrapper.addEventListener('click', event => {
        event.stopPropagation()
    })

    newAside.addEventListener('click', () => {
        portfolio.removeChild(newAside)
    })

    getAllProjects()
        .then(amountInDb => printAllWorksToModale(amountInDb, galleryDiv))
        .catch(e => {console.log('Cant find any images', e)})

    boutonFermer.appendChild(iconFermer)
    boutonsAction.appendChild(boutonFermer)
    modalWrapper.appendChild(boutonsAction)
    modalWrapper.appendChild(titreModal)
    modalWrapper.appendChild(galleryDiv)
    modalWrapper.appendChild(seperateur)
    modalWrapper.appendChild(boutonAjout)
    newAside.appendChild(modalWrapper)
    portfolio.appendChild(newAside)
}



// Function to append Photos to modale gallery
function printModaleGallery(e, dom) {
    const newElement = document.createElement('figure')
    const elementImg = document.createElement('img')
    const iconSupprimer = document.createElement('i')

    newElement.className = `modale-card`
    newElement.setAttribute('id', e.id)
    elementImg.setAttribute('src', e.imageUrl)
    elementImg.setAttribute('alt', e.title)
    iconSupprimer.setAttribute('class', 'fa-2xs fa-solid fa-trash-can')

    iconSupprimer.addEventListener('click', (e) => {

        const modalGallery = document.getElementById('modalGallery')
        const modalItems = modalGallery.querySelectorAll('*')
        const galleryItems = gallery.querySelectorAll('*')
        let currentItem = e.target.parentNode
        let currentItemID = currentItem.getAttribute('id')

        // Delete from modale
        for (let element of modalItems) {
            let currentID = element.getAttribute('id')

            if (currentID === currentItemID) {
                modalGallery.removeChild(element)
            }
        }
        // Delete from site gallery
        for (let element of galleryItems) {
            let currentID = element.getAttribute('id')

            if (currentID === currentItemID) {
                gallery.removeChild(element)
            }
        }
        // Delete from backend
        supprimeProjet(currentItemID)
    })

    newElement.appendChild(iconSupprimer)
    newElement.appendChild(elementImg)
    dom.appendChild(newElement)
}

//Ajoutez au DOM tout les projets
export async function printAllWorksToModale (elements, dom) {
    for (let element of elements) {
        printModaleGallery(element, dom)
    }
}