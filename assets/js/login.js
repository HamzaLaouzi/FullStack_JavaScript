/**
* Lógica del fichero login.html
* Maneja la autenticación de usuarios y la redirección post-login
*/

const form = document.getElementById('login-form')
const emailInput = document.getElementById('login-email')
const passwordInput = document.getElementById('login-password')

function validateForm() {
    let isValid = true;
    form.classList.remove('was-validated');

    // Validar email
    if (!emailInput.value.trim()) {
        emailInput.setCustomValidity('El email es obligatorio');
        isValid = false;
    } else {
        emailInput.setCustomValidity('');
    }

    // Validar contraseña
    if (!passwordInput.value) {
        passwordInput.setCustomValidity('La contraseña es obligatoria');
        isValid = false;
    } else {
        passwordInput.setCustomValidity('');
    }

    form.classList.add('was-validated');
    return isValid;
}

function handleLogin(event) {
    event.preventDefault()

    if (!validateForm()) {
        return;
    }

    const emailValue = emailInput.value.trim()
    const passwordValue = passwordInput.value

    const user = window.usuarios.find(u => u.email === emailValue && u.password === passwordValue)
    if (user) {
        // Guardar la sesión del usuario
        window.setCurrentUser(user)
        
        // Limpiar el formulario
        form.reset()
        form.classList.remove('was-validated')
        
        // Verificar si hay un voluntariado pendiente
        const voluntariadoPendiente = sessionStorage.getItem('voluntariadoPendiente')
        if (voluntariadoPendiente) {
            // Si hay un voluntariado pendiente, redirigir a la página de voluntariado
            sessionStorage.removeItem('voluntariadoPendiente')
            window.location.href = 'voluntariado.html'
        } else {
            // Si no hay voluntariado pendiente, redirigir al dashboard
            window.location.href = 'index.html'
        }
    } else {
        alert("Dirección de correo o contraseña incorrectos")
        passwordInput.value = '' // Limpiar la contraseña por seguridad
        passwordInput.focus()
    }
}

// Inicializar el formulario cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    // Verificar si ya hay una sesión activa
    const currentUser = localStorage.getItem('currentUser')
    if (currentUser) {
        window.location.href = 'index.html'
        return
    }

    // Event listeners
    form.addEventListener('submit', handleLogin)

    // Validación en tiempo real
    emailInput.addEventListener('input', () => {
        if (form.classList.contains('was-validated')) {
            validateForm()
        }
    })

    passwordInput.addEventListener('input', () => {
        if (form.classList.contains('was-validated')) {
            validateForm()
        }
    })
})