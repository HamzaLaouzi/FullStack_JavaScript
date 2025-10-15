/**
* lógica del fichero index.html
*/

const container = document.getElementById('cards-container')
const template = document.getElementById('card-template')

// Verificar si hay un usuario logueado
function updateLoginStatus() {
    const currentUser = localStorage.getItem('currentUser')
    const navUser = document.getElementById('nav-user')
    const loginLink = document.querySelector('a[href="login.html"]')
    
    if (currentUser) {
        const user = JSON.parse(currentUser)
        if (navUser) {
            navUser.textContent = user.email
        }
        if (loginLink) {
            loginLink.textContent = 'Logout'
            loginLink.href = '#'
            loginLink.onclick = function(e) {
                e.preventDefault()
                localStorage.removeItem('currentUser')
                window.location.reload()
            }
        }
    } else {
        if (navUser) {
            navUser.textContent = '-no login-'
        }
        if (loginLink) {
            loginLink.textContent = 'Login'
            loginLink.href = 'login.html'
            loginLink.onclick = null
        }
    }
}

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

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    updateLoginStatus()
    setYear()
    if (window.anuncios) {
        renderCards()
    }
})