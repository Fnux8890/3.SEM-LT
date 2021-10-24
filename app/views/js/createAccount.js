const createaccount = document.getElementById('createaccount-btn')
const element = document.getElementById('usernameerror')

console.log(createaccount)

function passwordError() {
	element.style.fontSize = '14px'
	element.style.position = 'fixed'
	element.style.top = '320px'
	element.style.left = '80px'
	element.style.visibility = 'visible'
	element.textContent = "Password doesn't match"
	console.log('passworderror')
}

function usernameError() {
	element.style.fontSize = '14px'
	element.style.position = 'fixed'
	element.style.top = '180px'
	element.style.left = '75px'
	element.style.visibility = 'visible'
	element.textContent = 'Username already exists'
	console.log('usernameerror')
}

document.addEventListener('submit', async e => {
	e.preventDefault()

	const password = document.getElementById('password').value
	console.log(password)
	const confirm = document.getElementById('confirmpassword').value
	console.log(confirm)

	if (password == confirm)
		try {
			const username = document.getElementById('username').value
			console.log(username)
			await axios.post('/api/v1/users', { username, password })
			console.log('user added')
			window.open('http://localhost:3000/page/user-overview', '_parent')
		} catch (error) {
			console.log(error)
			usernameError()
			setTimeout(() => {
				element.style.visibility = 'hidden'
			}, 5000)
		}
	else {
		passwordError()
		setTimeout(() => {
			element.style.visibility = 'hidden'
		}, 5000)
	}
})
