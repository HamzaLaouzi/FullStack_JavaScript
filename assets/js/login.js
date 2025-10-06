import { usuarios } from "./datos.js";

/* GESTIÓN DE LOGIN ----------------------------------------------------------------------------------*/
document.querySelector('#login form').addEventListener('submit', (e) => {
  e.preventDefault();
  
  const email = document.getElementById('inputEmail').value;
  const contraseña = document.getElementById('inputContraseña').value;
  const logged = document.getElementById('logged');
  const usuarioValido = usuarios.find(usuario => 
    usuario.email === email && usuario.contraseña === contraseña
  );

  if (usuarioValido) { /* Cambiar mail usuario y mensajes */
    logged.textContent = usuarioValido.email;
    logged.classList.remove('disabled');
    logged.removeAttribute('aria-disabled');
    alert('Sesión iniciada correctamente');
    e.target.reset();
  } else {
    alert('Los datos de inicio de sesión son incorrectos');
    e.target.reset();
  }
});