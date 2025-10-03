/**
* lógica del fichero registro.html 
*/

const table = document.getElementById("users-table")
const form = document.getElementById("registro-form")

function addRow(nombre, email, password, index) {
    let newRow = table.tBodies[0].insertRow()

    let cell1 = newRow.insertCell(0)
    let cell2 = newRow.insertCell(1)
    let cell3 = newRow.insertCell(2)
    let cell4 = newRow.insertCell(3)

    cell1.textContent = nombre
    cell2.textContent = email
    cell3.textContent = password
    cell4.innerHTML = `<button type="button" class="btn btn-danger delete-button">Eliminar</button>`

    let deleteButton = newRow.querySelector(".delete-button")
    deleteButton.addEventListener("click", function () {
        usuarios.splice(index, 1)
        newRow.remove()
    })
}

for (let index = 0; index < window.usuarios.length; index++) {
    let user = window.usuarios[index]
    addRow(user.nombre, user.email, user.password, index)
}

function addNewUser(event) {
    event.preventDefault()

    let userName = document.getElementById("reg-nombre").value  
    let userEmail = document.getElementById("reg-email").value
    let userPassword = document.getElementById("reg-password").value

    if (userName && userEmail && userPassword) {
        window.usuarios.push({ nombre: userName, email: userEmail, password: userPassword })

        addRow(userName, userEmail, userPassword, window.usuarios.length - 1)
        alert("Nuevo usuario registrado correctamente")
        form.reset()
    } else {
        alert("Faltan datos para añadir registro")
    }
}

form.addEventListener("submit", addNewUser)

