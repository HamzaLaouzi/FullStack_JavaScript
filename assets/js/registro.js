// Maquetación funcional de Gestión de Usuarios
(function initUsers() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Refrescar estado de sesión en la navbar
    if (window.DATOS) {
        DATOS.updateNavbarUser();
        DATOS.attachNavbarHandlers();
    }

    // Datos de ejemplo para visualizar
    const users = (window.DATOS && DATOS.readUsers()) || [];

    const tbody = document.querySelector('#users-table tbody');
    function render() {
        if (!tbody) return;
        tbody.innerHTML = '';
        users.forEach((u, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${u.nombre}</td>
                <td>${u.email}</td>
                <td>${u.password}</td>
                <td><button data-idx="${idx}" class="btn btn-sm btn-danger btn-del">Borrar</button></td>
            `;
            tbody.appendChild(tr);
        });
    }
    render();

    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-del');
            if (btn) {
                const idx = Number(btn.getAttribute('data-idx'));
                users.splice(idx, 1);
                DATOS.writeUsers(users);
                render();
            }
        });
    }

    const form = document.getElementById('registro-form');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            if (!form.checkValidity()) {
                ev.stopPropagation();
            } else {
                const nombre = document.getElementById('reg-nombre').value.trim();
                const email = document.getElementById('reg-email').value.trim();
                const password = document.getElementById('reg-password').value.trim();
                users.push({ nombre, email, password });
                DATOS.writeUsers(users);
                render();
                form.reset();
                form.classList.remove('was-validated');
            }
            form.classList.add('was-validated');
        });
    }
})();


