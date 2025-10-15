// Los anuncios están disponibles globalmente desde datos.js como window.anuncios

/* GESTIÓN DE VOLUNTARIADOS --------------------------------------------------------------------------*/

function mostrarVoluntariados() { /* Mostrar los voluntariados creados --------------------*/
  const container = document.getElementById('lista-voluntariados');
  if (!container) {
    console.error('No se encontró el contenedor lista-voluntariados');
    return;
  }
  container.innerHTML = '';

  console.log('Anuncios disponibles:', window.anuncios); // Para depuración

  if (!window.anuncios) {
    console.error('No se encontró la variable anuncios');
    return;
  }

  window.anuncios.forEach((anuncio, index) => {
    const fila = document.createElement('tr');
    fila.className = 'align-middle';
    fila.innerHTML = `
      <td class="align-middle">${anuncio.title}</td>
      <td class="align-middle">${anuncio.autor}</td>
      <td class="align-middle">${anuncio.date}</td>
      <td class="align-middle">${anuncio.description}</td>
      <td class="align-middle text-center">
        <span class="badge ${anuncio.volunType === 'Oferta' ? 'bg-success' : 'bg-primary'} px-3 py-2">
          ${anuncio.volunType}
        </span>
      </td>
      <td class="text-center align-middle">
        <button class="btn btn-sm btn-danger" onclick="eliminarVoluntariado(${index})" title="Eliminar voluntariado">
          <i class="bi bi-trash"></i>
        </button>
      </td>
    `;
    container.appendChild(fila);
  });
}

window.eliminarVoluntariado = function(indice) { /* Eliminar voluntariado --------------------------*/
  // Verificar si el usuario está logueado
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    alert('Debes iniciar sesión para eliminar voluntariados');
    return;
  }

  // Verificar si el usuario es el autor del voluntariado
  const voluntariado = window.anuncios[indice];
  if (voluntariado.autor !== currentUser.email) {
    alert('Solo puedes eliminar tus propios voluntariados');
    return;
  }

  window.anuncios.splice(indice, 1);
  mostrarVoluntariados();
}

/* EVENTOS -------------------------------------------------------------------------------------------*/
document.querySelector('#voluntariados form').addEventListener('submit', (e) => { /* Alta -*/
  e.preventDefault();
  
  const titulo = document.getElementById('alta-vol-titulo').value.trim();
  const fecha = document.getElementById('alta-vol-fecha').value;
  const descripcion = document.querySelector('#alta-vol-desc').value.trim();
  const tipo = document.getElementById('alta-vol-tipo').value === 'Petición' ? 'Petición' : 'Oferta';

  // Validaciones
  if (!titulo || !fecha || !descripcion) {
    alert('Todos los campos son obligatorios');
    return;
  }
  
  // Verificar si el usuario está logueado
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  if (!currentUser) {
    // Guardar los datos del formulario en sessionStorage
    sessionStorage.setItem('voluntariadoPendiente', JSON.stringify({
      titulo, fecha, descripcion, tipo
    }));
    
    alert('Para publicar el voluntariado necesitas iniciar sesión primero');
    window.location.href = 'login.html';
    return;
  }

  const nuevoVoluntariado = {
    title: titulo,
    date: fecha,
    description: descripcion,
    autor: currentUser.email,
    volunType: tipo
  };

  window.anuncios.push(nuevoVoluntariado);
  mostrarVoluntariados();
  e.target.reset();
  alert('Voluntariado creado correctamente');
});

// Función para actualizar el estado de login en la interfaz
function updateLoginStatus() {
    const currentUser = localStorage.getItem('currentUser');
    const navUser = document.getElementById('nav-user');
    const loginLink = document.querySelector('a[href="login.html"]');
    const userInput = document.getElementById('alta-vol-usuario');
    const deleteButtons = document.querySelectorAll('.btn-danger');
    
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
                window.location.reload();
            }
        }
        
        // Configurar campo de usuario
        if (userInput) {
            userInput.value = user.email;
            userInput.disabled = true;
        }
        
        // Mostrar botones de eliminar solo para los voluntariados del usuario
        deleteButtons.forEach((btn, index) => {
            const voluntariado = window.anuncios[index];
            btn.style.display = voluntariado.autor === user.email ? 'inline-block' : 'none';
        });
    } else {
        if (navUser) {
            navUser.textContent = '-no login-';
        }
        if (loginLink) {
            loginLink.textContent = 'Login';
            loginLink.href = 'login.html';
            loginLink.onclick = null;
        }
        
        // Configurar campo de usuario cuando no hay sesión
        if (userInput) {
            userInput.value = '-no login-';
            userInput.disabled = true;
        }
        
        // Ocultar todos los botones de eliminar
        deleteButtons.forEach(btn => {
            btn.style.display = 'none';
        });
    }
}

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    updateLoginStatus();
    mostrarVoluntariados();
  const usuarioInput = document.getElementById('alta-vol-usuario');
  if (usuarioInput) {
    usuarioInput.value = window.currentUser ? window.currentUser.nombre : '';
    usuarioInput.disabled = true;
  }
});