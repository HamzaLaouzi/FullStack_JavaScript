/**
* lógica del fichero index.html
*/

const container = document.getElementById('cards-container')
const template = document.getElementById('card-template')

function renderCards() {
	container.innerHTML = ''
	window.anuncios.forEach(item => {
		const clone = template.content.cloneNode(true)
		const titleEl = clone.querySelector('.vol-card__title')
		const dateEl = clone.querySelector('.vol-card__date')
		const descEl = clone.querySelector('.vol-card__desc')
		const authorEl = clone.querySelector('.vol-card__author-name')
		const article = clone.querySelector('.vol-card')

		titleEl.textContent = item.title
		dateEl.textContent = item.date
		descEl.textContent = item.description
		authorEl.textContent = item.autor

		article.classList.remove('vol-card--blue', 'vol-card--green')
		if (item.volunType === 'Oferta') {
			article.classList.add('vol-card--blue')
		} else {
			article.classList.add('vol-card--green')
		}

		container.appendChild(clone)
	})
}

function setYear() {
	const yearEl = document.getElementById('year')
	if (yearEl) yearEl.textContent = String(new Date().getFullYear())
}

setYear()
renderCards()