// Inicialización de la vista de Login
(function initLogin() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    const form = document.getElementById('login-form');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            // Validación de Bootstrap
            if (!form.checkValidity()) {
                ev.stopPropagation();
            } else {
                const email = document.getElementById('login-email').value.trim();
                const password = document.getElementById('login-password').value.trim();
                const users = (window.DATOS && DATOS.readUsers()) || [];
                const match = users.find(u => u.email === email && u.password === password);
                if (match) {
                    DATOS.setCurrentUser(email);
                    alert('Inicio de sesión exitoso');
                    // Redirige al dashboard para reflejar el estado en la navbar
                    window.location.href = 'index.html';
                } else {
                    alert('Credenciales incorrectas');
                }
            }
            form.classList.add('was-validated');
        });
    }
})();


