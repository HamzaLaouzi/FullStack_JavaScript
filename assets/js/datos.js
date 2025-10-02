(function datosModule() {
    // Modo sin persistencia para datos, pero sesión del usuario en sessionStorage
    const SESSION_CURRENT_KEY = 're_session_current_user';

    function safeParse(raw, fallback) {
        try {
            const parsed = raw ? JSON.parse(raw) : fallback;
            return parsed == null ? fallback : parsed;
        } catch {
            return fallback;
        }
    }

    // Users
    function readUsers() {
        // Sin persistencia: siempre partir de los datos por defecto
        return defaultUsers();
    }

    function writeUsers(users) {
        // No-op en modo sin persistencia
    }

    function defaultUsers() {
        return [
            { nombre: 'hamza', email: 'hamza@hamza.com', password: '123' },
            { nombre: 'carmen', email: 'carmen@carmen.com', password: '123' }
        ];
    }

    function seedUsersIfEmpty() {
        // No-op en modo sin persistencia (los reads devuelven defaults)
    }

    function setCurrentUser(email) {
        const value = email || '';
        if (value) {
            try { sessionStorage.setItem(SESSION_CURRENT_KEY, value); } catch {}
        } else {
            try { sessionStorage.removeItem(SESSION_CURRENT_KEY); } catch {}
        }
        updateNavbarUser();
    }

    function getCurrentUser() {
        try {
            return sessionStorage.getItem(SESSION_CURRENT_KEY) || '';
        } catch {
            return '';
        }
    }

    function updateNavbarUser() {
        const el = document.getElementById('nav-user');
        if (el) {
            const email = getCurrentUser();
            el.textContent = email || '-no login-';
        }
    }

    function logout() {
        setCurrentUser('');
    }

    function attachNavbarHandlers() {
        const el = document.getElementById('nav-user');
        if (!el) return;
        // Reset listeners to avoid duplicates on SPA-like reloads
        el.replaceWith(el.cloneNode(true));
        const fresh = document.getElementById('nav-user');
        const email = getCurrentUser();
        if (email) {
            fresh.classList.add('text-decoration-underline');
            fresh.style.cursor = 'pointer';
            fresh.title = 'Cerrar sesión';
            fresh.addEventListener('click', () => {
                logout();
                updateNavbarUser();
                // Opcional: volver al dashboard tras cerrar sesión
                if (location.pathname.endsWith('voluntariado.html')) {
                    // quedarse
                }
            });
        } else {
            fresh.classList.remove('text-decoration-underline');
            fresh.style.cursor = '';
            fresh.title = '';
        }
    }

    // Voluntariados
    function readVoluntariados() {
        // Sin persistencia: siempre partir de los datos por defecto
        return defaultVoluntariados();
    }

    function writeVoluntariados(items) {
        // No-op en modo sin persistencia
    }

    function defaultVoluntariados() {
        return [
            { titulo: 'Se ofrece conductor para la zona de Fuenlabrada', usuario: 'hamza@hamza.com', fecha: '2025-02-10', desc: 'Chica responsable se ofrece para llevar a nuestros mayores al hospital de Fuenlabrada los lunes y martes Tardes', tipo: 'oferta' },
            { titulo: 'Se ofrece conductor para la zona de Barcelona', usuario: 'carmen@carmen.com', fecha: '2025-02-10', desc: 'Chica responsable se ofrece para llevar a nuestros mayores al hospital de barcelona los jueves  y viernes tardes', tipo: 'oferta' },
            { titulo: 'Se necesita un conductor para la zona de Valencia', usuario: 'carmen@carmen.com', fecha: '2025-02-10', desc: 'Se busca persona responsable para llevar a mi abuelo al hospital de Valencia, Sábado por la mañana.', tipo: 'peticion' }
        ];
    }

    function seedVoluntariadosIfEmpty() {
        // No-op en modo sin persistencia (los reads devuelven defaults)
    }

    function migrateIfNeeded() {
        // No-op en modo sin persistencia
    }

    function seedAllIfEmpty() {
        // No-op en modo sin persistencia
    }

    window.DATOS = {
        // Users
        readUsers,
        writeUsers,
        setCurrentUser,
        getCurrentUser,
        updateNavbarUser,
        logout,
        attachNavbarHandlers,
        // Voluntariados
        readVoluntariados,
        writeVoluntariados,
        // Seeding
        seedAllIfEmpty,
        seedUsersIfEmpty,
        seedVoluntariadosIfEmpty
    };
})();


