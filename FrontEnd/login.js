const loginForm = document.getElementById("login-form")

loginForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(loginForm)
    const loginData = Object.fromEntries(formData)

    console.log(loginData.email)

    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        sessionStorage.setItem("token", data.token)
        window.location.replace("/FrontEnd/index.html")
        console.log(data.userId)
    })
    .catch(e => console.log(e))
})