// Lógica básica para maqueta de gestión de voluntariados
(function initVoluntariado() {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    const list = (window.DATOS && DATOS.readVoluntariados()) || [];

	// Pre-rellenar el usuario con el email de sesión y bloquear edición
	const usuarioInput = document.getElementById('vol-usuario');
	if (usuarioInput && window.DATOS) {
		const currentEmail = DATOS.getCurrentUser();
		usuarioInput.value = currentEmail || '';
		usuarioInput.readOnly = true;
		if (!currentEmail) {
			usuarioInput.placeholder = 'Inicia sesión para publicar';
		}
	}

    const tbody = document.querySelector('#vol-table tbody');
    function render() {
        if (!tbody) return;
        tbody.innerHTML = '';
        list.forEach((it, idx) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${it.titulo}</td>
                <td>${it.usuario}</td>
                <td>${it.fecha}</td>
                <td style="max-width: 280px;">${it.desc}</td>
                <td>${it.tipo}</td>
                <td><button data-idx="${idx}" class="btn btn-sm btn-danger btn-del">Borrar</button></td>
            `;
            tbody.appendChild(tr);
        });
    }
    render();

    const form = document.getElementById('voluntariado-form');
    if (form) {
        form.addEventListener('submit', function (ev) {
            ev.preventDefault();
            if (!form.checkValidity()) {
                ev.stopPropagation();
			} else {
				const titulo = document.getElementById('vol-titulo').value.trim();
				const currentEmail = (window.DATOS && DATOS.getCurrentUser && DATOS.getCurrentUser()) || '';
				if (!currentEmail) {
					alert('Debes iniciar sesión para dar de alta un voluntariado.');
					return;
				}
                const fecha = document.getElementById('vol-fecha').value.trim();
                const desc = document.getElementById('vol-descripcion').value.trim();
                const tipo = document.getElementById('vol-tipo').value;
				list.push({ titulo, usuario: currentEmail, fecha, desc, tipo });
                DATOS.writeVoluntariados(list);
                render();
                form.reset();
                form.classList.remove('was-validated');
				// Rellenar de nuevo el usuario bloqueado tras reset
				if (usuarioInput) {
					usuarioInput.value = currentEmail;
				}
            }
            form.classList.add('was-validated');
        });
    }

    if (tbody) {
        tbody.addEventListener('click', (e) => {
            const btn = e.target.closest('.btn-del');
            if (btn) {
                const idx = Number(btn.getAttribute('data-idx'));
                list.splice(idx, 1);
                DATOS.writeVoluntariados(list);
                render();
            }
        });
    }
})();


