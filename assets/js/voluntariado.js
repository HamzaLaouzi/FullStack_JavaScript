/**
* lógica del fichero voluntariado.html
*/

const table = document.getElementById("vol-table")
const form = document.getElementById("voluntariado-form")

function addRow(title, usuario, date, description, volunType, index) {
    let newRow = table.tBodies[0].insertRow()
    let delButton = `<button type=\"button\" class=\"btn btn-danger delete-button\">Eliminar</button>`
    let cellClass = (volunType === "Oferta") ? "table-primary" : "table-success"

    let cell1 = newRow.insertCell(0)
    let cell2 = newRow.insertCell(1)
    let cell3 = newRow.insertCell(2)
    let cell4 = newRow.insertCell(3)
    let cell5 = newRow.insertCell(4)
    let cell6 = newRow.insertCell(5)

    cell1.textContent = title
    cell2.textContent = usuario
    cell3.textContent = date
    cell4.textContent = description
    cell5.textContent = volunType
    cell6.innerHTML = delButton

    newRow.classList.add(cellClass)

    let deleteButton = newRow.querySelector('.delete-button')
    deleteButton.addEventListener('click', function () {
        window.anuncios.splice(index, 1)
        newRow.remove()
    })
}

for (let index = 0; index < window.anuncios.length; index++) {
    let card = window.anuncios[index]
    addRow(card.title, card.autor, card.date, card.description, card.volunType, index)
}

function addNewCard(event) {
    event.preventDefault()

    let title = document.getElementById('vol-titulo').value
    let usuario = document.getElementById('vol-usuario').value
    let volunDate = document.getElementById('vol-fecha').value
    let description = document.getElementById('vol-descripcion').value
    let volunTypeValue = document.getElementById('vol-tipo').value // 'peticion' | 'oferta'

    let volunType = (volunTypeValue === 'oferta') ? 'Oferta' : 'Petición'

    if (title && usuario && volunDate && description && volunType) {
        window.anuncios.push({ date: volunDate, title, description, autor: usuario, volunType })
        addRow(title, usuario, volunDate, description, volunType, window.anuncios.length - 1)
        alert("Nuevo voluntariado registrado correctamente")
        form.reset()
    } else {
        alert("Faltan datos para añadir registro")
    }
}

form.addEventListener('submit', addNewCard)