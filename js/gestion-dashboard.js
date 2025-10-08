// js/gestion-dashboard.js

// Traer voluntariados desde sessionStorage o inicializar vacíos
let voluntariados = JSON.parse(sessionStorage.getItem('voluntariados')) || [];

// Verificar sesión
const usuario = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
if (!usuario) {
  window.location.href = "login.html";
}

// Elementos
const volForm = document.getElementById('volForm');
const volContainer = document.getElementById('volContainer');
const logoutLink = document.getElementById('logoutLink');
const welcomeMsg = document.getElementById('welcomeMsg');

// Mensaje de bienvenida
welcomeMsg.textContent = `Bienvenido, ${usuario.email}!`;

// Logout
logoutLink.addEventListener('click', () => {
  sessionStorage.removeItem('usuarioLogueado');
  window.location.href = "login.html";
});

// Función para renderizar voluntariados del usuario
function renderVoluntariados() {
  volContainer.innerHTML = "";
  const propios = voluntariados.filter(v => v.usuario === usuario.email);

  if (propios.length === 0) {
    volContainer.innerHTML = '<p class="text-center text-muted">No tienes voluntariados creados aún.</p>';
    return;
  }

  propios.forEach((v, index) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4');
    card.innerHTML = `
      <div class="card shadow h-100 border-success">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-success">${v.titulo}</h5>
          <p class="card-text flex-grow-1">${v.descripcion}</p>
          <p class="text-muted"><small>Fecha: ${v.fecha}</small></p>
          <button class="btn btn-danger btn-sm mt-2 align-self-end" data-index="${index}">Eliminar</button>
        </div>
      </div>
    `;
    volContainer.appendChild(card);
  });
}

// Añadir nuevo voluntariado
volForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoVol = {
    titulo: document.getElementById('titulo').value,
    descripcion: document.getElementById('descripcion').value,
    fecha: document.getElementById('fecha').value,
    usuario: usuario.email
  };

  voluntariados.push(nuevoVol);
  sessionStorage.setItem('voluntariados', JSON.stringify(voluntariados));

  renderVoluntariados();
  volForm.reset();
});

// Eliminar voluntariado
volContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    const propios = voluntariados.filter(v => v.usuario === usuario.email);
    const realIndex = voluntariados.indexOf(propios[index]);
    voluntariados.splice(realIndex, 1);
    sessionStorage.setItem('voluntariados', JSON.stringify(voluntariados));
    renderVoluntariados();
  }
});

// Render inicial
renderVoluntariados();
