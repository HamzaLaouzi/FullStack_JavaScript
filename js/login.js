// js/login.js
import { usuarios } from "./datos.js";
console.log("Usuarios cargados:", usuarios);
const loginForm = document.getElementById("loginForm");
const mensajeError = document.getElementById("mensajeError");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const usuarioValido = usuarios.find(u => u.email === email && u.password === password);

  if (usuarioValido) {
    sessionStorage.setItem("usuarioLogueado", JSON.stringify(usuarioValido));
    window.location.href = "index.html";
  } else {
    mensajeError.classList.remove("d-none");
  }
});

