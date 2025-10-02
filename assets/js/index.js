// Inicializaciones simples de la landing del dashboard
(function initDashboard() {
    const yearEl = document.getElementById('year');
    if (yearEl) {
        yearEl.textContent = new Date().getFullYear();
    }

    // Refrescar estado de sesión en la navbar
    if (window.DATOS) {
        DATOS.updateNavbarUser();
        DATOS.attachNavbarHandlers();
    }

    // Render desde datos.js (voluntariados almacenados)
    const container = document.getElementById('cards-container');
    const template = document.getElementById('card-template');
    if (container && template) {
        const list = (window.DATOS && DATOS.readVoluntariados()) || [];
        list.forEach((it) => {
            const node = template.content.cloneNode(true);
            const article = node.querySelector('.vol-card');
            const title = node.querySelector('.vol-card__title');
            const date = node.querySelector('.vol-card__date');
            const desc = node.querySelector('.vol-card__desc');
            const author = node.querySelector('.vol-card__author-name');

            if (article) {
                article.classList.remove('vol-card--blue', 'vol-card--green');
                const color = it.tipo === 'peticion' ? 'green' : 'blue';
                article.classList.add(color === 'green' ? 'vol-card--green' : 'vol-card--blue');
            }
            if (title) title.textContent = String(it.titulo || '').toUpperCase();
            if (date) date.textContent = it.fecha || '';
            if (desc) desc.textContent = it.desc || '';
            if (author) author.textContent = it.usuario || '';

            container.appendChild(node);
        });
    }
})();


