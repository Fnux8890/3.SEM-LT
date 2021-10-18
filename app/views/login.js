$(() => {
	let tempName

	document.addEventListener('submit', async e => {
		e.preventDefault()
		const name = document.getElementById('username').value

		console.log(name)

		try {
			if (name == tempName) {
				console.log('user exists')
				window.open('http://localhost:3000/user-overview', '_parent')
			} else {
				console.log("user doesn't exists")
			}
		} catch (error) {
			console.log(error)
		}
	})
})
