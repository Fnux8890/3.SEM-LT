const createaccount = document.getElementById('createaccount-btn')
console.log(createaccount)

function togglevisibility() {
	const element = document.getElementById('usernameerror')
	element.style.visibility = 'visible'
}

document.addEventListener('submit', async e => {
	e.preventDefault()
	const name = document.getElementById('username').value
	console.log(name)
	if (name)
		try {
			await axios.post('/api/v1/users', { name })
			console.log('user added')
		} catch (error) {
			console.log(error)
			togglevisibility()
		}
	else {
		togglevisibility()
	}
})
