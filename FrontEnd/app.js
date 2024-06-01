import { getAllProjects } from "./assets/Functions/api.js";
import { findFilters, printAllWorks, toggleActive, toggleInactive, removeGalleryImages, printFilteredGallery, createModuleModifier } from "./assets/Functions/dom.js";
import { printAdminModules, removeAdminModules, verificationAdmin } from "./assets/Functions/admin.js";

// createModuleModifier()
// -- ON WINDOW LOAD --
window.addEventListener("load", () => {
    verificationAdmin()
  })

// Verifier si la page est acceder par visiteurs ou admin
 

// Afficher les categories 
getAllProjects()
    .then(body => findFilters(body))
    .catch(e => {console.log('Cant find any categories', e)})

// Afficher tout les projets
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



