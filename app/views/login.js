$(() => {
	document.addEventListener('submit', async e => {
		e.preventDefault()
		try {
			username = document.getElementById('username').value
			password = document.getElementById('password').value
			console.log(username)
			console.log(password)
			await axios.post('/api/v1/users/login', username, password)
			//window.open('http://localhost:3000/user-overview', '_parent')
		} catch (error) {
			console.log(error)
		}
	})
})
