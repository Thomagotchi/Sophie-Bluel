import { removeGalleryFilters, findFilters, createModuleModifier } from "./dom.js"

const loginMenuItem = document.getElementById('loginLi')
const portfolioTitle = document.getElementById('portfolio-title')
const homeHeader = document.getElementById('header')

export async function verificationAdmin () {
    const userID = sessionStorage.getItem("userID")
    const userToken = sessionStorage.getItem("token")
    if (userID == 1 && userToken !== null) {
        printAdminModules()
    } else {
        return
    }
}

export async function removeAdminModules () {
    removeEditionHeader()
    removeFilterModificator()
    toggleLogin()
    findFilters()
}

export async function printAdminModules () {
    printEditionHeader()
    printFilterModificator()
    toggleLogout()
    removeGalleryFilters()
}


//Function to print 'modifier' module
function printFilterModificator() {
    const newDiv = document.createElement('div')
    const newI = document.createElement('i')
    const newA = document.createElement('a')

    newDiv.setAttribute('class', 'modifier')
    newDiv.setAttribute('id', 'modifier')

    newI.setAttribute('class', 'fa-regular fa-pen-to-square')
    newA.setAttribute('id', 'modifierButton')
    newA.innerText = 'modifier'
    newA.addEventListener('click', () => {
        createModuleModifier()
    })

    newDiv.appendChild(newI)
    newDiv.appendChild(newA)
    portfolioTitle.appendChild(newDiv)
}


// Function to show admin bar
function printEditionHeader () {
    const newDiv = document.createElement('div')
    const newI = document.createElement('i')
    const newP = document.createElement('p')

    newDiv.setAttribute('class', 'adminHeader')
    newI.setAttribute('class', 'fa-regular fa-pen-to-square')
    newP.innerText = 'Mode édition'

    newDiv.appendChild(newI)
    newDiv.appendChild(newP)
    homeHeader.insertBefore(newDiv, homeHeader.firstChild)
}

//function to change login to logout
function toggleLogout () {
    loginMenuItem.removeChild(loginMenuItem.firstChild)

    const newA = document.createElement('a')

    newA.setAttribute('href', "/FrontEnd/index.html")
    newA.setAttribute('id', 'logout')
    newA.innerText = "logout"
    newA.addEventListener('click', () => {
        removeAdminModules()
        sessionStorage.clear()
    })
    loginMenuItem.appendChild(newA)
}

function toggleLogin () {
    loginMenuItem.removeChild(loginMenuItem.firstChild)

    const newA = document.createElement('a')

    newA.setAttribute('href', "/FrontEnd/assets/pages/login.html")
    newA.setAttribute('id', 'login')
    newA.innerText = "login"

    loginMenuItem.appendChild(newA)
}

// Function to remove adminHeader 
function removeEditionHeader () {
    const adminModule = document.getElementsByClassName('adminHeader')
    homeHeader.removeChild(adminModule)
}
// function to remove gallery modifier
function removeFilterModificator () {
    const modifierButton = document.getElementsByClassName('modifier')
    portfolioTitle.removeChild(modifierButton)
}