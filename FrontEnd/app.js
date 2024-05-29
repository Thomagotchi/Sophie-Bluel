import { getAllProjects } from "./assets/Functions/api.js";
import { findFilters, printAllWorks, toggleActive, toggleInactive, removeGalleryImages, printFilteredGallery } from "./assets/Functions/dom.js";

// -- ON WINDOW LOAD --
getAllProjects()
    .then(body => findFilters(body))
    .catch(e => {console.log('Cant find any categories', e)})
getAllProjects()
    .then(amountInDb => printAllWorks(amountInDb))
    .catch(e => {console.log('Cant find any images', e)})


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
            .then(amountInDb => printAllWorks(amountInDb))
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
            .then(body => printFilteredGallery(body, 1))
    }

    if (e.target.parentElement.id == 'appartements') {
        console.log(e.target.parentElement.id)
        toggleActive(e.target.parentElement)
        toggleInactive(triObjets)
        toggleInactive(triTous)
        toggleInactive(triHotel)
        removeGalleryImages()
        getAllProjects()
            .then(body => printFilteredGallery(body, 2))
    }

    if (e.target.parentElement.id == 'hotel') {
        console.log(e.target.parentElement.id)
        toggleActive(e.target.parentElement)
        toggleInactive(triObjets)
        toggleInactive(triRestaurants)
        toggleInactive(triTous)
        removeGalleryImages()
        getAllProjects()
            .then(body => printFilteredGallery(body, 3))
    } else {
        return
    }
})

//Boutton 'se connecter'
// export function validateLogin() {
//     const email = document.getElementById("email")
//     const mdp = document.getElementById("password")

//     console.log(email, mdp)
// }



