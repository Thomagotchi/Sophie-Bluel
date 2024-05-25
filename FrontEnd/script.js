import { getAllProjects } from "./api.js";

//Variables
const gallery = document.getElementById('gallery')
const triGallery = document.getElementById('tri-gallery')


// Function to print works from API
function printGallery (e) {
    const newElement = document.createElement('figure')
    const elementImg = document.createElement('img')
    elementImg.setAttribute('src', e.imageUrl)
    elementImg.setAttribute('alt', e.title)
    const elementText = document.createElement('figcaption')
    elementText.innerText = e.title

    newElement.appendChild(elementImg)
    newElement.appendChild(elementText)

    gallery.appendChild(newElement)
}

//Function to print gallery filter
function printFilter (e) {
    const newElement = document.createElement('li')
    newElement.setAttribute('id', e)
    const elementH3 = document.createElement('h3')
    elementH3.innerText = e

    newElement.appendChild(elementH3)
    triGallery.appendChild(newElement)
}

//Amount of Images in Db
getAllProjects()
    .then(body => {return body.length})
    .then(amountInDb => printDbImages(amountInDb))
    .catch(e => {console.log('Cant find any images', e)})

function printDbImages (e) {
    for (let i = 0; i < e; i++) {
        getAllProjects().then(body => printGallery(body[i]))
    }
}

/* <li id="tous">
	    <h3>Tous</h3>
	/li> */