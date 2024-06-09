import { getAllProjects, deleteProject, sendWork } from "./api.js"

// ------------------------ VARIABLES ------------------------
const portfolio = document.getElementById('portfolio')
const gallery = document.getElementById('gallery')
const filterGallery = document.getElementById('filterGallery')


// ------------------------ MANIPULATION DU DOM  ------------------------

// Fonction pour créer l'element HTML pour un projet
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

// Fonction pour ajouté les filtres au DOM
function printFilter(element, state) {
    const newList = document.createElement('li')
    const newButton = document.createElement('btn')
    const elementH3 = document.createElement('h3')
    const elementId = element.split(' ')[0].toLowerCase()

    newButton.setAttribute('id', elementId)
    newButton.className = state
    newList.className = 'tri-button'
    elementH3.innerText = element

    newButton.appendChild(elementH3)
    newList.appendChild(newButton)
    filterGallery.appendChild(newList)
}

// Ajouté au DOM tout les projets
export function printAllWorks(elements) {
    for (let element of elements) {
        printGallery(element)
    }
}

// Supprimé les images de la gallery
export function removeGalleryImages() {
    gallery.querySelectorAll('*').forEach(n => n.remove())
}

// Ajouté au DOM les projets filtré
export function printFilteredGallery(elements, i) {
    for (let element of elements) {
        if (element.category.id == i) {
            printGallery(element, gallery)
        } 
    }
}

// Supprimé les filtres du DOM
export function removeGalleryFilters() {
    filterGallery.querySelectorAll('*').forEach(n => n.remove())
}

// Fonction pour trouvez les filtres existant et les ajoutez au DOM
export function findFilters(elements) {
    let categoryObjetsCounter = 0
    let categoryAppartCounter = 0
    let categoryHotelCounter = 0

    for (let element of elements) {
        if (element.category.id == 1) {categoryObjetsCounter++}
        if (element.category.id == 2) {categoryAppartCounter++}
        if (element.category.id == 3) {categoryHotelCounter++}
    }
    if (categoryObjetsCounter > 0 || categoryAppartCounter > 0 || categoryHotelCounter > 0) {
        printFilter('Tous', 'active')
    }
    if (categoryObjetsCounter > 0) {
        printFilter('Objets', 'inactive')
    }
    if (categoryAppartCounter > 0) {
        printFilter('Appartements', 'inactive')
    }
    if (categoryHotelCounter > 0) {
        printFilter('Hotel & restaurants', 'inactive')
    } if (categoryObjetsCounter === 0 && categoryAppartCounter === 0 && categoryHotelCounter === 0) {
        console.log('Pas de projets en cours')
    }
}

// Créer module 'modifier'
export async function createModuleModify() {

    // --- CREATION DE NOUVEAU ASIDE ---
    const newAside = document.createElement('aside')

    // Aside attributes
    newAside.setAttribute('id', 'modifyModal')
    newAside.setAttribute('class', 'modifyModal')
    newAside.setAttribute('aria-hidden', 'false')
    newAside.setAttribute('role', 'dialog')
    newAside.setAttribute('aria-labelledby', 'modalTitle')


    // --- CREATION DIV 'modal-wrapper' ---
    const modalWrapper = document.createElement('div')

    // Div 'modal wrapper' attribute
    modalWrapper.setAttribute('class', 'modalWrapper')


    // --- CREATION DIV 'ACTION BUTTONS' ---
    const actionButtons = document.createElement('div')
    const closeButton = document.createElement('button')
    const closeIcon = document.createElement('i')

    // Elements 'Action buttons' attributes
    actionButtons.setAttribute('class', 'modalActionButtons')
    closeButton.setAttribute('id', 'closeButton')
    closeIcon.setAttribute('class', 'fa-xl fa-solid fa-xmark')


    // --- CREATION DU TITRE ---
    const modalTitle = document.createElement('h3')

    // Titre text
    modalTitle.setAttribute('id', 'modalTitle')
    modalTitle.innerText = 'Galerie photo'


    // --- CREATION DIV 'GALLERY' ---
    const galleryDiv = document.createElement('div')

    // Div gallery attribute
    galleryDiv.setAttribute('id', 'modalGallery')


    // --- CREATION DIV 'Seperator' ---
    const seperator = document.createElement('div')

    // Div 'seperator' attribute
    seperator.setAttribute('class', 'seperator')

    // --- CREATION BOUTON AJOUT  ---
    const addButton = document.createElement('button')

    // Bouton ajout attributes
    addButton.setAttribute('id', 'addButton')
    addButton.innerText = 'Ajouter une photo'


     // --- EVENT LISTENERS ---
    addButton.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        createModuleAdd()
    })

    closeButton.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        document.body.style.position = ''
    })

    newAside.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        document.body.style.position = ''
    })

    modalWrapper.addEventListener('click', event => {
        event.stopPropagation()
    })


    // --- FONCTION AJOUT PHOTOS A MODAL GALLERY ---
    getAllProjects()
        .then(amountInDb => printAllWorksToModule(amountInDb, galleryDiv))
        .catch(e => {console.log('Cant find any images', e)})


    // --- AJOUT DES ELEMENTS AU DOM ---
    closeButton.appendChild(closeIcon)
    actionButtons.appendChild(closeButton)
    modalWrapper.appendChild(actionButtons)
    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(galleryDiv)
    modalWrapper.appendChild(seperator)
    modalWrapper.appendChild(addButton)
    newAside.appendChild(modalWrapper)
    portfolio.appendChild(newAside)
}

// Créer module 'Ajout photo'
export function createModuleAdd() {

    // --- CREATION DE NOUVEAU ASIDE ---
    const newAside = document.createElement('aside')

    // Aside attributes
    newAside.setAttribute('id', 'modifyModal')
    newAside.setAttribute('class', 'modifyModal')
    newAside.setAttribute('aria-hidden', 'false')
    newAside.setAttribute('role', 'dialog')
    newAside.setAttribute('aria-labelledby', 'modalTitle')

    
    // --- CREATION DIV 'modal-wrapper' ---
    const modalWrapper = document.createElement('div')

    // Div 'modal wrapper' attribute
    modalWrapper.setAttribute('class', 'modalWrapper')
    

    // --- CREATION DIV 'ACTION BUTTONS' ---
    const actionButtons = document.createElement('div')


    // --- CREATION ELEMENTS 'ACTION BUTTONS'  ---
    const closeButton = document.createElement('button')
    const closeIcon = document.createElement('i')
    const backButton = document.createElement('button')
    const backIcon = document.createElement('i')

    // Elements 'Action buttons' attributes
    actionButtons.setAttribute('class', 'modalActionButtons')
    closeButton.setAttribute('id', 'closeButton')
    closeIcon.setAttribute('class', 'fa-xl fa-solid fa-xmark')
    backButton.setAttribute('id', 'backButton')
    backIcon.setAttribute('class', 'fa-xl fa-solid fa-arrow-left')


    // --- CREATION DU TITRE ---
    const modalTitle = document.createElement('h3')

    // Titre text
    modalTitle.innerText = 'Ajout photo'


    // --- CREATION 'FORM' ---
    const addForm = document.createElement('form')

    // Form attribute
    addForm.setAttribute('id', 'addForm')


    // --- CREATION DOCUMENT INPUT DIVS ---
    const addFileInputDiv = document.createElement('div')
    const addFileInputDivDefaultPreview = document.createElement('div')

    // Div input attribute
    addFileInputDiv.setAttribute('class', 'fileInputDiv')
    addFileInputDivDefaultPreview.setAttribute('id', 'fileInputDivDefault')


    // --- CREATION ELEMENTS INPUT  ---
    const addFileInputImgPreview = document.createElement('img')
    const addFileInputIcon = document.createElement('icon')
    const addFileInputLabel = document.createElement('label')
    const addFileInputLabelImg = document.createElement('label')
    const addFileInputInfo = document.createElement('p')
    const addFileInput = document.createElement('input')

    // Input elements attributes
    addFileInputImgPreview.setAttribute('id', 'imgPreview')
    addFileInputImgPreview.setAttribute('src', '#')
    addFileInputImgPreview.setAttribute('alt', 'Votre image')
    addFileInputImgPreview.setAttribute('for', 'addFileInput')
    addFileInputIcon.setAttribute('class', 'fa-regular fa-image fa-5x')
    addFileInputIcon.setAttribute('id', 'addFileInputIcon')
    addFileInputLabel.setAttribute('for', 'addFileInput')
    addFileInputLabel.setAttribute('class', 'addFileInputLabel')
    addFileInputLabelImg.setAttribute('id', 'addFileInputLabelImg')
    addFileInputLabelImg.setAttribute('for', 'addFileInput')
    addFileInputLabelImg.setAttribute('class', 'hidden')
    addFileInputLabel.innerText = "+ Ajouter photo"
    addFileInputInfo.innerText = 'jpg, png: 4mo max'
    addFileInput.setAttribute('id', 'addFileInput')
    addFileInput.setAttribute('name', 'image')
    addFileInput.setAttribute('type', 'file')
    addFileInput.setAttribute('accept', '.jpg, .jpeg, .png')

    
    // --- CREATION TITRE 'FORM' ---
    const addFileTitleLabel = document.createElement('label')
    const addFileTitle = document.createElement('input')

    // Titre attributes
    addFileTitleLabel.setAttribute('for', 'addTitle')
    addFileTitleLabel.innerText = 'Titre'
    addFileTitle.setAttribute('name', 'title')
    addFileTitle.setAttribute('id', 'addTitle')


    // --- CREATION ELEMENTS SELECT ---
    const addFileCategoryLabel = document.createElement('label')
    const addFileCategorySelect = document.createElement('select')
    const addFileSelectCat0 = document.createElement('option')
    const addFileSelectCat1 = document.createElement('option')
    const addFileSelectCat2 = document.createElement('option')
    const addFileSelectCat3 = document.createElement('option')

    // Select attributes
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


    // --- CREATION DIV 'Seperator' ---
    const seperator = document.createElement('div')

    // --- Div 'seperator' attribute ---
    seperator.setAttribute('class', 'seperator')


    // --- CREATION DU BOUTON SUBMIT  ---
    const submitButton = document.createElement('button')

    // Bouton submit attributes
    submitButton.setAttribute('id', 'submitButton')
    submitButton.setAttribute('class', 'inactive')
    submitButton.innerText = 'Valider'
    submitButton.setAttribute('form', 'addForm')
    submitButton.setAttribute('type', 'submit')


    // --- EVENT LISTENERS ---
    addForm.addEventListener('submit', (event) => {
        event.preventDefault()
    })

    backIcon.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        createModuleModify()
        document.body.style.position = 'fixed'
    })

    closeButton.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        document.body.style.position = ''
    })

    modalWrapper.addEventListener('click', event => {
        event.stopPropagation()
    })

    newAside.addEventListener('click', () => {
        portfolio.removeChild(newAside)
        document.body.style.position = ''
    })

    addFileInput.onchange = function() {
        const [inputImage] = addFileInput.files
        // Limiteur pour taille du fichier
        if([inputImage].size > 4194304) {
            alert("Fichier est trop gros!")
            addFileInput.value = ""
        }

        // Affichage de l'image à envoyer
        if (inputImage) {
            addFileInputDivDefaultPreview.setAttribute('class', 'hidden')
            addFileInputLabelImg.removeAttribute('class')
            addFileInputImgPreview.src = URL.createObjectURL(inputImage)
        }
        checkSend()
    }

    addFileTitle.addEventListener('change', () => checkSend()) 

    addFileCategorySelect.addEventListener('change', () => checkSend())

    function checkSend() {
        if( addFileCategorySelect.value != "" && addFileInput.value != "" && addFileTitle.value != "" ) {
            console.log('u can send')
            console.log(addFileCategorySelect.value)
            console.log(addFileInput.value)
            console.log(addFileTitle.value)
            submitButton.removeAttribute('class')

            addForm.addEventListener('submit', sendWorkEvent)

        } else {
            addForm.removeEventListener('submit', sendWorkEvent)
            submitButton.setAttribute('class', 'inactive')
        }
    }

    function sendWorkEvent(event) {
        event.preventDefault()
                const formData = new FormData(addForm)
        
                // Send work to backend and refresh portfolio gallery
                sendWork(formData)
        
                // Resets inputs in case of  bad request
                resetInput(addFileInput)
                resetInput(addFileTitle)
                resetInput(addFileCategorySelect)

                addFileInputDivDefaultPreview.removeAttribute('class')
                addFileInputLabelImg.setAttribute('class', 'hidden')

                submitButton.setAttribute('class', 'inactive')
    }


    // --- AJOUT DES ELEMENTS AU DOM ---
    backButton.appendChild(backIcon)
    closeButton.appendChild(closeIcon)
    actionButtons.appendChild(backButton)
    actionButtons.appendChild(closeButton)

    addFileInputDivDefaultPreview.appendChild(addFileInputIcon)
    addFileInputDivDefaultPreview.appendChild(addFileInputLabel)
    addFileInputDivDefaultPreview.appendChild(addFileInputInfo)
    addFileInputLabelImg.appendChild(addFileInputImgPreview)
    addFileInputDiv.appendChild(addFileInputDivDefaultPreview)
    addFileInputDiv.appendChild(addFileInputLabelImg)


    addFileCategorySelect.appendChild(addFileSelectCat0)
    addFileCategorySelect.appendChild(addFileSelectCat1)
    addFileCategorySelect.appendChild(addFileSelectCat2)
    addFileCategorySelect.appendChild(addFileSelectCat3)

    addForm.appendChild(addFileInputDiv)
    addForm.appendChild(addFileInput)
    addForm.appendChild(addFileTitleLabel)
    addForm.appendChild(addFileTitle)
    addForm.appendChild(addFileCategoryLabel)
    addForm.appendChild(addFileCategorySelect)

    modalWrapper.appendChild(actionButtons)
    modalWrapper.appendChild(modalTitle)
    modalWrapper.appendChild(addForm)
    modalWrapper.appendChild(seperator)
    modalWrapper.appendChild(submitButton)

    newAside.appendChild(modalWrapper)

    portfolio.appendChild(newAside)
}

// Function to append Photos to modale gallery
function printModuleGallery(element, dom) {
    // --- CREATING
    const newElement = document.createElement('figure')
    const elementImg = document.createElement('img')
    const deleteIcon = document.createElement('i')

    newElement.className = `modalCard`
    newElement.setAttribute('id', element.id)
    elementImg.setAttribute('src', element.imageUrl)
    elementImg.setAttribute('alt', element.title)
    deleteIcon.setAttribute('class', 'fa-2xs fa-solid fa-trash-can')

    deleteIcon.addEventListener('click', event => {
        
        const modalGallery = document.getElementById('modalGallery')
        const modalItems = modalGallery.querySelectorAll('*')
        const galleryItems = gallery.querySelectorAll('*')
        let currentItem = event.target.parentNode
        let currentItemID = currentItem.getAttribute('id')

        // Delete from modale
        for (let modalItem of modalItems) {
            let currentID = modalItem.getAttribute('id')

            if (currentID === currentItemID) {
                modalGallery.removeChild(modalItem)
            }
        }
        // Delete from site gallery
        for (let galleryItem of galleryItems) {
            let currentID = galleryItem.getAttribute('id')

            if (currentID === currentItemID) {
                gallery.removeChild(galleryItem)
            }
        }
        // Delete from backend
        deleteProject(currentItemID)
    })

    newElement.appendChild(deleteIcon)
    newElement.appendChild(elementImg)
    dom.appendChild(newElement)
}

// Ajouté au DOM tout les projets
export function printAllWorksToModule (elements, dom) {
    for (let element of elements) {
        printModuleGallery(element, dom)
    }
}

// ------------------------ EVENT LISTENERS ------------------------

// Event listeners des filtres
document.getElementById("filterGallery").addEventListener("click", (event) => {
    const filterTous = document.getElementById('tous')
    const filterObjets = document.getElementById('objets')
    const filterRestaurants = document.getElementById('appartements')
    const filterHotel = document.getElementById('hotel')


    if (event.target.parentElement.id == 'tous') {
        toggleActive(event.target.parentElement)
        toggleInactive(filterObjets)
        toggleInactive(filterRestaurants)
        toggleInactive(filterHotel)
        removeGalleryImages()
        getAllProjects()
            .then(amountInDb => printAllWorks(amountInDb))
            .catch(e => {console.log('Cant find any images', e)})
    }

    if (event.target.parentElement.id == 'objets') {
        toggleActive(event.target.parentElement)
        toggleInactive(filterTous)
        toggleInactive(filterRestaurants)
        toggleInactive(filterHotel)
        removeGalleryImages()
        getAllProjects()
            .then(body => printFilteredGallery(body, 1))
    }

    if (event.target.parentElement.id == 'appartements') {
        toggleActive(event.target.parentElement)
        toggleInactive(filterObjets)
        toggleInactive(filterTous)
        toggleInactive(filterHotel)
        removeGalleryImages()
        getAllProjects()
            .then(body => printFilteredGallery(body, 2))
    }

    if (event.target.parentElement.id == 'hotel') {
        toggleActive(event.target.parentElement)
        toggleInactive(filterObjets)
        toggleInactive(filterRestaurants)
        toggleInactive(filterTous)
        removeGalleryImages()
        getAllProjects()
            .then(body => printFilteredGallery(body, 3))
    } 
})


// ------------------------ FONCTIONS ------------------------

// Activé un filtre
export function toggleActive(element) {
    if (element.className == 'inactive') {
        element.setAttribute('class', 'active')  
    } 
}

// Désactivé un filtre
export function toggleInactive(element) {
    if (element.className == 'active') {
        element.setAttribute('class', 'inactive')  
    } 
}

// Fonction pour vider input
export function resetInput(inputValue) {
    inputValue.value = null
}

// Permet de scroll une fois que le contenue est charger avec un Timeout 
export function moveToHash() {
    let urlHash = window.location.hash;
  
    if (urlHash) {
      setTimeout(() => {
        window.location.hash = '';
        window.location.hash = urlHash;
      }, 50) 
    }
  }