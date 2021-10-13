var createaccount = document.getElementById('createaccount-btn')
const element = document.getElementById('usernameerror')

console.log(createaccount)

function togglevisibility() {
	
	element.style.fontSize = '14px'
	element.style.position = "fixed"
	element.style.top = '320px'
	element.style.left = '10px'
	element.style.visibility = 'visible'
}

document.addEventListener('submit', async e => {
	e.preventDefault()
	const name = document.getElementById('username').value
	const password = document.getElementById('password').value
	const confirm = document.getElementById('confirmpassword').value

	if (name && password == confirm)
		try {
			await axios.post('/api/v1/users', { name,password })
			console.log('user added')
			window.open('http://localhost:3000/user-overview', '_parent')
		} catch (error) {
			console.log(error)
			togglevisibility()
		}
	else {
		togglevisibility()
		setTimeout(() => {
			element.style.visibility = 'hidden'
		  }, 2000)
	}
})
