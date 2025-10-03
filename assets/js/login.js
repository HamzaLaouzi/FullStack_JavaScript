/**
* lógica del fichero login.html
*/

const form = document.getElementById('login-form')
const emailInput = document.getElementById('login-email')
const passwordInput = document.getElementById('login-password')

function handleLogin(event) {
    event.preventDefault()

    const emailValue = emailInput.value
    const passwordValue = passwordInput.value

    const user = window.usuarios.find(u => u.email === emailValue && u.password === passwordValue)
    if (user) {
        alert(`Se ha iniciado sesión correctamente. Bienvenid@ ${user.nombre}`)
    } else {
        alert("Dirección de correo o contraseña incorrectos")
    }
}

form.addEventListener('submit', handleLogin)