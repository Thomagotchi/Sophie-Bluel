import { printAdminModules } from "./assets/Functions/admin.js"


const loginForm = document.getElementById("login-form")
const loginEmailInput = document.getElementById("email")
const loginPasswordInput = document.getElementById("password")
const isLoggedIn = 'false'

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(loginForm)
    const loginData = Object.fromEntries(formData)

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginData)
        })
        .then(res => {
            if (res.status === 404) {
                loginEmailInput.value = ""
                loginPasswordInput.value = ""
                throw Error('404, user not found'
                )}
            if(res.ok) {
                return res.json() 
                .then(data => {
                    sessionStorage.setItem("token", data.token)
                    sessionStorage.setItem("userID", data.userId)
                    window.location.replace("/FrontEnd/index.html")
                })    
            } else {
                loginEmailInput.value = ""
                loginPasswordInput.value = "" 
            }})
        .catch(error => {
            loginEmailInput.value = ""
            loginPasswordInput.value = ""
            console.log(error)
        })  
})