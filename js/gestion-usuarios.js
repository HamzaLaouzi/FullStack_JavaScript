// js/gestion-usuarios.js

// Traer usuarios desde sessionStorage o inicializar vacíos
let usuarios = JSON.parse(sessionStorage.getItem('usuarios')) || [];

// Verificar sesión
const usuarioLogueado = JSON.parse(sessionStorage.getItem('usuarioLogueado'));
if (!usuarioLogueado) {
  window.location.href = "login.html";
}

// Elementos del DOM
const userForm = document.getElementById('userForm');
const userContainer = document.getElementById('userContainer');
const logoutLink = document.getElementById('logoutLink');
const welcomeMsg = document.getElementById('welcomeMsg');

welcomeMsg.textContent = `Bienvenido, ${usuarioLogueado.email}!`;

// Logout
logoutLink.addEventListener('click', () => {
  sessionStorage.removeItem('usuarioLogueado');
  window.location.href = "login.html";
});

// Renderizar usuarios
function renderUsuarios() {
  userContainer.innerHTML = "";

  if (usuarios.length === 0) {
    userContainer.innerHTML = '<p class="text-center text-muted">No hay usuarios registrados.</p>';
    return;
  }

  usuarios.forEach((u, index) => {
    const card = document.createElement('div');
    card.classList.add('col-md-4');
    card.innerHTML = `
      <div class="card shadow h-100 border-primary">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title text-primary">${u.email}</h5>
          <p class="text-muted flex-grow-1">Contraseña: ••••••••</p>
          ${u.email === usuarioLogueado.email ? '<button class="btn btn-danger btn-sm mt-2 align-self-end" data-index="'+index+'">Eliminar</button>' : ''}
        </div>
      </div>
    `;
    userContainer.appendChild(card);
  });
}

// Añadir nuevo usuario
userForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const nuevoUsuario = {
    email: document.getElementById('email').value,
    password: document.getElementById('password').value
  };

  usuarios.push(nuevoUsuario);
  sessionStorage.setItem('usuarios', JSON.stringify(usuarios));

  renderUsuarios();
  userForm.reset();
});

// Eliminar usuario (solo el propio)
userContainer.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const index = e.target.dataset.index;
    usuarios.splice(index, 1);
    sessionStorage.setItem('usuarios', JSON.stringify(usuarios));

    // También cerrar sesión si eliminamos nuestro usuario
    sessionStorage.removeItem('usuarioLogueado');
    window.location.href = "login.html";
  }
});

// Render inicial
renderUsuarios();
