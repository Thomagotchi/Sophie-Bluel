import { getAllProjects, supprimeProjet, sendWork } from "./api.js"
// --- VARIABLES ----
// Portfolio
const portfolio = document.getElementById('portfolio')
//Galleries
const gallery = document.getElementById('gallery')
const triGallery = document.getElementById('tri-gallery')

// --- DOM MANIPULATION ---



//Activer un filtre
export function toggleActive(e) {
    if (e.className == 'inactive') {
        e.setAttribute('class', 'active')  
    } else {
        return 
    }
}

//Desactiver un filtre
export function toggleInactive(e) {
    if (e.className == 'active') {
        e.setAttribute('class', 'inactive')  
    } else {
        return 
    }
}

// Function to append Gallery Photos to DOM
function printGallery(element) {
    const newElement = document.createElement('figure')
    const elementImg = document.createElement('img')
    const elementText = document.createElement('figcaption')

    newElement.className = `cat-${element.category.id}`
    newElement.setAttribute('id', element.id)
    elementImg.setAttribute('src', element.imageUrl)
    elementImg.setAttribute('alt', element.title)
    elementText.innerText = element.title

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
export function printAllWorks(elements) {
    for (let element of elements) {
        printGallery(element)
    }
}

//Supprimez les images du DOM
export function removeGalleryImages() {
    gallery.querySelectorAll('*').forEach(n => n.remove())
}

// Ajoutez au DOM les projets filtrer
export function printFilteredGallery(elements, i) {
    for (let element of elements) {
        if (element.category.id == i) {
            printGallery(element, gallery)
        } 
    }
}

//Supprimez les filtres du DOM
export function removeGalleryFilters() {
    triGallery.querySelectorAll('*').forEach(n => n.remove())
}

//Fonction pour trouvez les filtres existant et les ajoutez au DOM
export function findFilters(elements) {
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
    } if (eObjets === 0 && eAppart === 0 && eHotel === 0) {
        console.log('Pas de projets en cours')
    }
}

// Créer module 'modifier'
export async function createModuleModifier() {
    const newAside = document.createElement('aside')
    const modalWrapper = document.createElement('div')
    const actionButtons = document.createElement('div')
    const closeButton = document.createElement('button')
    const closeIcon = document.createElement('i')
    const modalTitle = document.createElement('h3')
    const galleryDiv = document.createElement('div')
    const seperateur = document.createElement('div')
    const boutonAjout = document.createElement('button')

    newAside.setAttribute('id', 'modifierModal')
    newAside.setAttribute('class', 'modifierModal')
    newAside.setAttribute('aria-hidden', 'false')
    newAside.setAttribute('role', 'dialog')
    newAside.setAttribute('aria-labelledby', 'modalTitle')
    modalWrapper.setAttribute('class', 'modal-wrapper')
    actionButtons.setAttribute('class', 'modalBoutonsAction')
    closeButton.setAttribute('id', 'closeButton')
    closeIcon.setAttribute('class', 'fa-xl fa-solid fa-xmark')
    modalTitle.setAttribute('id', 'modalTitle')
    modalTitle.innerText = 'Galerie photo'
    galleryDiv.setAttribute('id', 'modalGallery')
    seperateur.setAttribute('class', 'seperateur')
    boutonAjout.setAttribute('id', 'boutonAjout')
    boutonAjout.innerText = 'Ajouter une photo'

    boutonAjout.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        createModuleAjout()
    })

    closeButton.addEventListener('click', () => {
        portfolio.removeChild(newAside)
    })

    newAside.addEventListener('click', () => {
        portfolio.removeChild(newAside)
    })

    modalWrapper.addEventListener('click', event => {
        event.stopPropagation()
    })

    getAllProjects()
        .then(amountInDb => printAllWorksToModale(amountInDb, galleryDiv))
        .catch(e => {console.log('Cant find any images', e)})

    closeButton.appendChild(closeIcon)
    actionButtons.appendChild(closeButton)
    modalWrapper.appendChild(actionButtons)
    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(galleryDiv)
    modalWrapper.appendChild(seperateur)
    modalWrapper.appendChild(boutonAjout)
    newAside.appendChild(modalWrapper)
    portfolio.appendChild(newAside)
}

// Créer module 'Ajout photo'
export function createModuleAjout() {

    // --- CREATING NEW ASIDE ---
    const newAside = document.createElement('aside')

    // Setting aside attributes
    newAside.setAttribute('id', 'modifierModal')
    newAside.setAttribute('class', 'modifierModal')
    newAside.setAttribute('aria-hidden', 'false')
    newAside.setAttribute('role', 'dialog')
    newAside.setAttribute('aria-labelledby', 'modalTitle')
    
    // --- CREATING 'AJOUT PHOTO' CONTAINER DIV ---
    const modalWrapper = document.createElement('div')

    // Setting container div attribute
    modalWrapper.setAttribute('class', 'modal-wrapper')
    
    // --- CREATING ACTION BUTTONS CONTAINER DIV ---
    const actionButtons = document.createElement('div')

    // --- CREATING ACTION BUTTONS ELEMENTS ---
    const closeButton = document.createElement('button')
    const closeIcon = document.createElement('i')
    const backButton = document.createElement('button')
    const backIcon = document.createElement('i')
    // Setting action buttons attributes
    actionButtons.setAttribute('class', 'modalBoutonsAction')
    closeButton.setAttribute('id', 'closeButton')
    closeIcon.setAttribute('class', 'fa-xl fa-solid fa-xmark')
    backButton.setAttribute('id', 'backButton')
    backIcon.setAttribute('class', 'fa-solid fa-arrow-left')

    // --- CREATING TITLE ---
    const modalTitle = document.createElement('h3')
    // Setting title text
    modalTitle.innerText = 'Ajout photo'
    
    // --- CREATING SEPARATOR DIV ---
    const seperateur = document.createElement('div')

    // --- CREATING FORM CONTAINER ---
    const addForm = document.createElement('form')
    // Setting form container attributes
    addForm.setAttribute('id', 'addForm')

    // --- CREATING FILE INPUT DIV ---
    const addFileInputDiv = document.createElement('div')
    // Setting file input elements attributes
    addFileInputDiv.setAttribute('class', 'fileInputDiv')

    // --- CREATING FILE INPUT ELEMENTS ---
    const addFileInput = document.createElement('input')
    const addFileInputIcon = document.createElement('icon')
    const addFileInputLabel = document.createElement('label')
    const addFileInputButton = document.createElement('button')
    const addFileInputInfo = document.createElement('p')
    
    

    // Setting file input elements attributes
    addFileInput.setAttribute('id', 'addFileInput')
    addFileInput.setAttribute('name', 'image')
    addFileInput.setAttribute('type', 'file')

    addFileInputIcon.setAttribute('class', 'fa-regular fa-image')
    addFileInputIcon.setAttribute('id', 'addFileInputIcon')
    
    addFileInputLabel.setAttribute('for', 'addFileInput')
    addFileInputButton.setAttribute('id', 'addFileInputButton')
    addFileInputButton.innerText = '+ Ajouter photo'

    addFileInputInfo.innerText = 'jpg, png: 4mo max'

    // --- CREATING FORM TITLE INPUT ---
    const addFileTitleLabel = document.createElement('label')
    const addFileTitle = document.createElement('input')
    // Setting input title attributes
    addFileTitleLabel.setAttribute('for', 'addTitle')
    addFileTitleLabel.innerText = 'Titre'
    addFileTitle.setAttribute('name', 'title')
    addFileTitle.setAttribute('id', 'addTitle')

    // --- CREATING FORM SELECT AND ELEMENTS ---
    const addFileCategoryLabel = document.createElement('label')
    const addFileCategorySelect = document.createElement('select')
    const addFileSelectCat0 = document.createElement('option')
    const addFileSelectCat1 = document.createElement('option')
    const addFileSelectCat2 = document.createElement('option')
    const addFileSelectCat3 = document.createElement('option')
    // Setting form select elements attributes
    addFileCategoryLabel.innerText = 'Catégorie'
    addFileCategoryLabel.setAttribute('for', 'categorySelect') 

    addFileCategorySelect.setAttribute('id', 'categorySelect')
    addFileCategorySelect.setAttribute('name', 'category')

    addFileSelectCat0.innerText = ''

    addFileSelectCat1.setAttribute('value', 1)
    addFileSelectCat1.innerText = 'Objets'

    addFileSelectCat2.setAttribute('value', 2)
    addFileSelectCat2.innerText = 'Appartements'

    addFileSelectCat3.setAttribute('value', 3)
    addFileSelectCat3.innerText = 'Hotels & restaurants'
    
    // --- CREATING SUBMIT BUTTON ---
    const submitButton = document.createElement('button')
    // Setting submit button attributes
    submitButton.setAttribute('id', 'submitButton')
    submitButton.innerText = 'Valider'
    submitButton.setAttribute('form', 'addForm')
    submitButton.setAttribute('type', 'submit')

    // --- EVENT LISTENERS ---
    addForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const formData = new FormData(addForm)

        // Send work to backend and refresh portfolio gallery
        sendWork(formData)

        // Resets inputs in case of  bad request
        resetInput(addFileInput)
        resetInput(addFileTitle)
        resetInput(addFileCategorySelect)
    })

    backIcon.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        createModuleModifier()
    })

    closeButton.addEventListener('click', () => {
        portfolio.removeChild(newAside)
    })

    modalWrapper.addEventListener('click', event => {
        event.stopPropagation()
    })

    newAside.addEventListener('click', () => {
        portfolio.removeChild(newAside)
    })

    // --- APPENDING EACH ELEMENT TO DOM ---
    backButton.appendChild(backIcon)
    closeButton.appendChild(closeIcon)
    actionButtons.appendChild(backButton)
    actionButtons.appendChild(closeButton)

    addFileInputDiv.appendChild(addFileInput)
    addFileInputDiv.appendChild(addFileInputIcon)
    addFileInputDiv.appendChild(addFileInputLabel)
    addFileInputDiv.appendChild(addFileInputInfo)

    addFileCategorySelect.appendChild(addFileSelectCat0)
    addFileCategorySelect.appendChild(addFileSelectCat1)
    addFileCategorySelect.appendChild(addFileSelectCat2)
    addFileCategorySelect.appendChild(addFileSelectCat3)

    addForm.appendChild(addFileInputDiv)
    addForm.appendChild(addFileTitleLabel)
    addForm.appendChild(addFileTitle)
    addForm.appendChild(addFileCategoryLabel)
    addForm.appendChild(addFileCategorySelect)

    modalWrapper.appendChild(actionButtons)
    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(addForm)
    modalWrapper.appendChild(seperateur)
    modalWrapper.appendChild(submitButton)

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

    iconSupprimer.addEventListener('click', event => {
        
        const modalGallery = document.getElementById('modalGallery')
        const modalItems = modalGallery.querySelectorAll('*')
        const galleryItems = gallery.querySelectorAll('*')
        let currentItem = event.target.parentNode
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
export function printAllWorksToModale (elements, dom) {
    for (let element of elements) {
        printModaleGallery(element, dom)
    }
}

function printIncomplete() {
    console.log(`Impossible de charger l'image, information manquantes.`)
}

export function resetInput(inputValue) {
    inputValue.value = null
}