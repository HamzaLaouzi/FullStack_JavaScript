import { voluntariados } from "./datos.js";

const contenedor = document.getElementById("cardsContainer");
// Verificar sesión
const usuario = JSON.parse(sessionStorage.getItem("usuarioLogueado"));
if (!usuario) {
  window.location.href = "login.html"; // Redirige si no está logueado
}
voluntariados.forEach(v => {
  const card = document.createElement("div");
  card.classList.add("col-md-4");
  card.innerHTML = `
    <div class="card shadow p-3 h-100">
      <h5 class="card-title">${v.titulo}</h5>
      <p class="card-text">${v.descripcion}</p>
      <p class="text-muted"><small>Fecha: ${v.fecha}</small></p>
    </div>
  `;
  cardsContainer.appendChild(card);

  const color = v.tipo === "oferta" ? "success" : "info";

  card.innerHTML = `
    <div class="card border-${color} shadow-sm">
      <div class="card-body">
        <h5 class="card-title text-${color}">
          ${v.tipo === "oferta" ? "🌟 Oferta" : "🙋 Petición"}
        </h5>
        <p class="card-text">${v.descripcion}</p>
        <p class="mb-1"><strong>Nombre:</strong> ${v.nombre}</p>
        <p class="mb-1"><strong>Destino:</strong> ${v.destino}</p>
        <p class="text-muted"><small>Fecha: ${v.fecha}</small></p>
      </div>
    </div>
  `;

  contenedor.appendChild(card);
});
