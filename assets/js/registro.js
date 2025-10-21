// Los usuarios están disponibles globalmente desde datos.js
/* GESTIÓN DE USUARIOS --------------------------------------------------------------------------------*/

// Función para actualizar el estado de login en la interfaz
function updateLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const navUser = document.getElementById('nav-user');
    const loginLink = document.querySelector('a[href="login.html"]');
    
    if (currentUser) {
        const user = JSON.parse(currentUser);
        if (navUser) {
            navUser.textContent = user.email;
        }
        if (loginLink) {
            loginLink.textContent = 'Logout';
            loginLink.href = '#';
            loginLink.onclick = function(e) {
                e.preventDefault();
                localStorage.removeItem('currentUser');
                window.location.href = 'login.html';
            }
        }
    } else {
        if (navUser) {
            navUser.textContent = '-no login-';
        }
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
            loginLink.onclick = null;
        }
    }
}

function mostrarUsuarios() { /* Mostrar los usuarios creados ----------------------------*/
    const container = document.getElementById('lista-usuarios');
    container.innerHTML = '';

    window.usuarios.forEach((usuario, index) => {
      const fila = document.createElement('tr');
      fila.className = 'align-middle';
      fila.innerHTML = `
        <td class="align-middle">${usuario.nombre}</td>
        <td class="align-middle">${usuario.email}</td>
        <td class="align-middle">${usuario.password}</td>
        <td class="text-center align-middle">
          <button class="btn btn-sm btn-danger" onclick="eliminarUsuario(${index})" title="Eliminar usuario">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      `;
      container.appendChild(fila);
    });
}
window.eliminarUsuario = function(indice) { /* Eliminar usuarios ---------------------------------*/
    // Verificar si el usuario está logueado
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (!currentUser) {
        alert('Debes iniciar sesión para eliminar usuarios');
        return;
    }
    // Verificar si el usuario es el mismo que se intenta eliminar
    window.usuarios.splice(indice, 1);
    mostrarUsuarios();
}

/* EVENTOS -------------------------------------------------------------------------------------------*/
document.querySelector('#usuarios form').addEventListener('submit', (e) => { /* Alta -----*/
  e.preventDefault();
  
  const nombre = document.getElementById('alta-usr-name').value.trim();
  const email = document.getElementById('alta-usr-email').value.trim();
  const password = document.getElementById('alta-usr-pswrd').value;

  // Validaciones
  if (!nombre || !email || !password) {
    alert('Todos los campos son obligatorios');
    return;
  }


  // Verificar si el email ya existe
  if (window.usuarios.some(u => u.email === email)) {
    alert('Ya existe un usuario con ese email');
    return;
  }
  
  const nuevoUsuario = {
    nombre,
    email,
    password 
  };
  
  window.usuarios.push(nuevoUsuario);
  mostrarUsuarios();
  e.target.reset();
  alert('Usuario creado correctamente.');
});

document.addEventListener('DOMContentLoaded', () => {
    updateLoginStatus();
    mostrarUsuarios();
});
