import { voluntariados } from "./datos.js";

// Comprobar sesión
const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
if (!usuario) {
  window.location.href = "login.html";
}

// Logout
document.getElementById("logoutLink").addEventListener("click", () => {
  sessionStorage.removeItem("usuarioLogueado");
  window.location.href = "login.html";
});

// Elementos
const volForm = document.getElementById("volForm");
const volContainer = document.getElementById("volContainer");

// Función para renderizar voluntariados
function renderVoluntariados() {
  volContainer.innerHTML = "";
  voluntariados.forEach((v, index) => {
    const card = document.createElement("div");
    card.classList.add("col-md-4");
    card.innerHTML = `
      <div class="card shadow p-3 h-100">
        <h5 class="card-title">${v.titulo}</h5>
        <p class="card-text">${v.descripcion}</p>
        <p class="text-muted"><small>Fecha: ${v.fecha}</small></p>
        <button class="btn btn-danger btn-sm mt-2" data-index="${index}">Eliminar</button>
      </div>
    `;
    volContainer.appendChild(card);
  });
}

// Añadir nuevo voluntariado
volForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const nuevoVol = {
    titulo: document.getElementById("titulo").value,
    descripcion: document.getElementById("descripcion").value,
    fecha: document.getElementById("fecha").value
  };

  voluntariados.push(nuevoVol);
  renderVoluntariados();
  volForm.reset();
});

// Eliminar voluntariado
volContainer.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    const index = e.target.dataset.index;
    voluntariados.splice(index, 1);
    renderVoluntariados();
  }
});

// Render inicial
renderVoluntariados();
