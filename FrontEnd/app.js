import { getAllProjects } from "./assets/Functions/api.js";
import { printAllWorks } from "./assets/Functions/dom.js";
import { verificationAdmin } from "./assets/Functions/admin.js";

// -- ON WINDOW LOAD --

// Verifie si l'utilisateur est un administrateur 
window.addEventListener("load", () => {
    verificationAdmin()
  })

// Afficher tout les projets
getAllProjects()
    .then(amountInDb => printAllWorks(amountInDb))
    .catch(e => {console.log('Cant find any images', e)})