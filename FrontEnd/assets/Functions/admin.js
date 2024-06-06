import { getAllProjects } from "./api.js"
import { removeGalleryFilters, findFilters, createModuleModify } from "./dom.js"

// Elements du DOM
const loginMenuItem = document.getElementById('loginList')
const portfolioTitle = document.getElementById('portfolioTitle')
const homeHeader = document.getElementById('header')

// Fonction pour verifier si utilisateur est admin
export async function verificationAdmin() {
    const userID = sessionStorage.getItem("userID")
    const userToken = sessionStorage.getItem("token")
    if (userID == 1 && userToken !== null) {
        printAdminModules()
    } else {
        getAllProjects()
            .then(body => findFilters(body))
            .catch(console.log('Pas trouver de categories'))
    }
}

// Fonction pour ajouter tout elements Admin
export async function printAdminModules() {
    printEditionHeader()
    printFilterModify()
    toggleLogout()
    removeGalleryFilters()
}

// Fonction pour ajouter modal 'modifier' au DOM
function printFilterModify() {
    const newDiv = document.createElement('div')
    const newIcon = document.createElement('i')
    const newAnchor = document.createElement('a')

    newDiv.setAttribute('class', 'modify')
    newDiv.setAttribute('id', 'modify')

    newIcon.setAttribute('class', 'fa-regular fa-pen-to-square')
    newAnchor.setAttribute('id', 'modifyButton')
    newAnchor.innerText = 'modifier'
    newAnchor.addEventListener('click', () => {
        createModuleModify()
    })

    newDiv.appendChild(newIcon)
    newDiv.appendChild(newAnchor)
    portfolioTitle.appendChild(newDiv)
}

// Fonction pour ajouter admin bar au DOM
function printEditionHeader() {
    const newDiv = document.createElement('div')
    const newIcon = document.createElement('i')
    const newParagraph = document.createElement('p')

    newDiv.setAttribute('class', 'adminHeader')
    newIcon.setAttribute('class', 'fa-regular fa-pen-to-square')
    newParagraph.innerText = 'Mode édition'

    newDiv.appendChild(newIcon)
    newDiv.appendChild(newParagraph)
    homeHeader.insertBefore(newDiv, homeHeader.firstChild)
}

//  fonction pour changer login à logout
function toggleLogout() {
    loginMenuItem.removeChild(loginMenuItem.firstChild)

    const newAnchor = document.createElement('a')

    newAnchor.setAttribute('href', "/FrontEnd/index.html")
    newAnchor.setAttribute('id', 'logout')
    newAnchor.innerText = "logout"
    newAnchor.addEventListener('click', () => {
        sessionStorage.clear()
    })
    loginMenuItem.appendChild(newAnchor)
}