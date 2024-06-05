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



// const toutObjets = [
    // {
    //     "id": 1,
    //     "title": "Abat-jour Tahina",
    //     "imageUrl": "http://localhost:5678/images/abajour-tahina1651286843956.png",
    //     "categoryId": 1,
    //     "userId": 1,
    //     "category": {
    //       "id": 1,
    //       "name": "Objets"
    //     }
    //   }
//     {
//         "id": 2,
//         "title": "Appartement Paris V",
//         "imageUrl": "http://localhost:5678/images/appartement-paris-v1651287270508.png",
//         "categoryId": 2,
//         "userId": 1,
//         "category": {
//           "id": 2,
//           "name": "Appartements"
//         }
//       }
//     {
//       "id": 3,
//       "title": "Restaurant Sushisen - Londres",
//       "imageUrl": "http://localhost:5678/images/restaurant-sushisen-londres1651287319271.png",
//       "categoryId": 3,
//       "userId": 1,
//       "category": {
//         "id": 3,
//         "name": "Hotels & restaurants"
//       }
//     },
//     {
//       "id": 4,
//       "title": "Villa “La Balisiere” - Port Louis",
//       "imageUrl": "http://localhost:5678/images/la-balisiere1651287350102.png",
//       "categoryId": 2,
//       "userId": 1,
//       "category": {
//         "id": 2,
//         "name": "Appartements"
//       }
//     },
//     {
//       "id": 5,
//       "title": "Structures Thermopolis",
//       "imageUrl": "http://localhost:5678/images/structures-thermopolis1651287380258.png",
//       "categoryId": 1,
//       "userId": 1,
//       "category": {
//         "id": 1,
//         "name": "Objets"
//       }
//     },
//     {
//       "id": 6,
//       "title": "Appartement Paris X",
//       "imageUrl": "http://localhost:5678/images/appartement-paris-x1651287435459.png",
//       "categoryId": 2,
//       "userId": 1,
//       "category": {
//         "id": 2,
//         "name": "Appartements"
//       }
//     },
//     {
//       "id": 7,
//       "title": "Pavillon “Le coteau” - Cassis",
//       "imageUrl": "http://localhost:5678/images/le-coteau-cassis1651287469876.png",
//       "categoryId": 2,
//       "userId": 1,
//       "category": {
//         "id": 2,
//         "name": "Appartements"
//       }
//     },
//     {
//       "id": 8,
//       "title": "Villa Ferneze - Isola d’Elba",
//       "imageUrl": "http://localhost:5678/images/villa-ferneze1651287511604.png",
//       "categoryId": 2,
//       "userId": 1,
//       "category": {
//         "id": 2,
//         "name": "Appartements"
//       }
//     },
//     {
//       "id": 9,
//       "title": "Appartement Paris XVIII",
//       "imageUrl": "http://localhost:5678/images/appartement-paris-xviii1651287541053.png",
//       "categoryId": 2,
//       "userId": 1,
//       "category": {
//         "id": 2,
//         "name": "Appartements"
//       }
//     },
//     {
//       "id": 10,
//       "title": "Bar “Lullaby” - Paris",
//       "imageUrl": "http://localhost:5678/images/bar-lullaby-paris1651287567130.png",
//       "categoryId": 3,
//       "userId": 1,
//       "category": {
//         "id": 3,
//         "name": "Hotels & restaurants"
//       }
//     },
//     {
//       "id": 11,
//       "title": "Hotel First Arte - New Delhi",
//       "imageUrl": "http://localhost:5678/images/hotel-first-arte-new-delhi1651287605585.png",
//       "categoryId": 3,
//       "userId": 1,
//       "category": {
//         "id": 3,
//         "name": "Hotels & restaurants"
//       }
//     }
//   ]