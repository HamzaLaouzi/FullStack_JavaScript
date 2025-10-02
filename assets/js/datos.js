(function datosModule() {
    const KEY_USERS = 're_users';
    const KEY_CURRENT = 're_current_user';
    const KEY_VOLUNT = 're_voluntariados';
    const KEY_DATA_VERSION = 're_data_version';
    const CURRENT_DATA_VERSION = '2';

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
        const raw = localStorage.getItem(KEY_USERS);
        const list = safeParse(raw, []);
        return Array.isArray(list) ? list : [];
    }

    function writeUsers(users) {
        localStorage.setItem(KEY_USERS, JSON.stringify(users || []));
    }

    function defaultUsers() {
        return [
            { nombre: 'hamza', email: 'hamza@hamza.com', password: '123' },
            { nombre: 'carmen', email: 'carmen@carmen.com', password: '123' }
        ];
    }

    function seedUsersIfEmpty() {
        const current = readUsers();
        if (current.length === 0) {
            writeUsers(defaultUsers());
        }
    }

    function setCurrentUser(email) {
        if (email) localStorage.setItem(KEY_CURRENT, email);
        else localStorage.removeItem(KEY_CURRENT);
        updateNavbarUser();
    }

    function getCurrentUser() {
        return localStorage.getItem(KEY_CURRENT) || '';
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
        const raw = localStorage.getItem(KEY_VOLUNT);
        const list = safeParse(raw, []);
        return Array.isArray(list) ? list : [];
    }

    function writeVoluntariados(items) {
        localStorage.setItem(KEY_VOLUNT, JSON.stringify(items || []));
    }

    function defaultVoluntariados() {
        return [
            { titulo: 'Se ofrece conductor para la zona de Fuenlabrada', usuario: 'hamza@hamza.com', fecha: '2025-02-10', desc: 'Chica responsable se ofrece para llevar a nuestros mayores al hospital de Fuenlabrada los lunes y martes Tardes', tipo: 'oferta' },
            { titulo: 'Se ofrece conductor para la zona de Barcelona', usuario: 'carmen@carmen.com', fecha: '2025-02-10', desc: 'Chica responsable se ofrece para llevar a nuestros mayores al hospital de barcelona los jueves  y viernes tardes', tipo: 'oferta' },
            { titulo: 'Se necesita un conductor para la zona de Valencia', usuario: 'carmen@carmen.com', fecha: '2025-02-10', desc: 'Se busca persona responsable para llevar a mi abuelo al hospital de Valencia, Sábado por la mañana.', tipo: 'peticion' }
        ];
    }

    function seedVoluntariadosIfEmpty() {
        const current = readVoluntariados();
        if (current.length === 0) {
            writeVoluntariados(defaultVoluntariados());
        }
    }

    function migrateIfNeeded() {
        const storedVersion = localStorage.getItem(KEY_DATA_VERSION) || '';
        if (storedVersion !== CURRENT_DATA_VERSION) {
            writeUsers(defaultUsers());
            writeVoluntariados(defaultVoluntariados());
            localStorage.setItem(KEY_DATA_VERSION, CURRENT_DATA_VERSION);
        }
    }

    function seedAllIfEmpty() {
        migrateIfNeeded();
        seedUsersIfEmpty();
        seedVoluntariadosIfEmpty();
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


