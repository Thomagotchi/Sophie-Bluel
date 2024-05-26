import { getAllProjects } from "./api.js";

// --- VARIABLES ----

//Gallery
const gallery = document.getElementById('gallery')
const triGallery = document.getElementById('tri-gallery')


// --- FONCTIONS ---

//Toggle Filter Active
function toggleActive(e) {
    if (e.className == 'inactive') {
        e.setAttribute('class', 'active')  
    } else {
        return 
    }
}

//Toggle Filter Inactive
function toggleInactive(e) {
    if (e.className == 'active') {
        e.setAttribute('class', 'inactive')  
    } else {
        return 
    }
}

// --- DOM MANIPULATION ---
// Function to print works from API
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

function printFilteredGallery(e, c) {
    if (e.categoryId = c) {
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
    } else {
        return
    }
}

//Function to print gallery filter
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

//Print all Photos 
getAllProjects()
    .then(body => {return body.length})
    .then(amountInDb => printDbImages(amountInDb))
    .catch(e => {console.log('Cant find any images', e)})

function printDbImages(e) {
    if(e > 0) { 
        for (let i = 0; i < e; i++) {
            getAllProjects().then(body => printGallery(body[i]))}
    } else {
        console.log('Pas de projets disponible')
    }  
}

function printObjetsImages(e) {
    if(e > 0) { 
        for (let i = 0; i < e; i++) {
            getAllProjects()
                .then(body => printFilteredGallery(body[i], 1))}
    } else {
        console.log('Pas de projets disponible')
    }  
}

function printAppartsImages(e) {
    if(e > 0) { 
        for (let i = 0; i < e; i++) {
            getAllProjects()
                .then(body => printFilteredGallery(body[i], 2))}
    } else {
        console.log('Pas de projets disponible')
    }  
}

function printHotelImages(e) {
    if(e > 0) { 
        for (let i = 0; i < e; i++) {
            getAllProjects()
                .then(body => printFilteredGallery(body[i], 3))}
    } else {
        console.log('Pas de projets disponible')
    }  
} 

//Removing all gallery images
function removeGalleryImages() {
    gallery.querySelectorAll('*').forEach(n => n.remove())
    console.log(gallery.childNodes)
}

//Removing gallery Filters
function removeGalleryFilters() {
    gallery.querySelectorAll('*').forEach(n => n.remove())
    console.log(triGallery.childNodes)
}
// Function to find which filters to print, then print
function findFilters (elements) {
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
// --- EVENT LISTENERS ---
// Filter menu event listeners
document.getElementById("tri-gallery").addEventListener("click", function(e) {
    const triTous = document.getElementById('tous')
    const triObjets = document.getElementById('objets')
    const triRestaurants = document.getElementById('appartements')
    const triHotel = document.getElementById('hotel')


    if (e.target.parentElement.id == 'tous') {
        console.log(e.target.parentElement.id)
        toggleActive(e.target.parentElement)
        toggleInactive(triObjets)
        toggleInactive(triRestaurants)
        toggleInactive(triHotel)
        removeGalleryImages()
        getAllProjects()
            .then(body => {return body.length})
            .then(amountInDb => printDbImages(amountInDb))
            .catch(e => {console.log('Cant find any images', e)})
    }
    if (e.target.parentElement.id == 'objets') {
        console.log(e.target.parentElement.id)
        toggleActive(e.target.parentElement)
        toggleInactive(triTous)
        toggleInactive(triRestaurants)
        toggleInactive(triHotel)
        removeGalleryImages()
        getAllProjects()
            .then(body => {return body.length})
            .then(amountInDb => printObjetsImages(amountInDb))
            .catch(e => {console.log('Cant find any images', e)})
    }
    if (e.target.parentElement.id == 'appartements') {
        console.log(e.target.parentElement.id)
        toggleActive(e.target.parentElement)
        toggleInactive(triObjets)
        toggleInactive(triTous)
        toggleInactive(triHotel)
        removeGalleryImages()
        getAllProjects()
            .then(body => {return body.length})
            .then(amountInDb => printAppartsImages(amountInDb))
            .catch(e => {console.log('Cant find any images', e)})
    }
    if (e.target.parentElement.id == 'hotel') {
        console.log(e.target.parentElement.id)
        toggleActive(e.target.parentElement)
        toggleInactive(triObjets)
        toggleInactive(triRestaurants)
        toggleInactive(triTous)
        removeGalleryImages()
        getAllProjects()
            .then(body => {return body.length})
            .then(amountInDb => printHotelImages(amountInDb))
            .catch(e => {console.log('Cant find any images', e)})
    } else {
        return
    }
})

getAllProjects()
            .then(body => findFilters(body))
