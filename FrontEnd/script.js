import { getImages } from "./api.js";


// Function to print works from API
const gallery = document.getElementById('gallery')
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

//Images in Db
getImages().then(body => {return body})
//Amount of Images in Db
getImages()
    .then(body => {return body.length})
    .then(amountInDb => printDbImages(amountInDb))
    .catch(e => {console.log('Cant find any images', e)})

function printDbImages (e) {
    for (let i = 0; i < e; i++) {
        getImages().then(body => printGallery(body[i]))
    }
}

