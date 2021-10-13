params = window.location.search
const id = new URLSearchParams(params).get('id')
let tempName
console.log(id)

document.addEventListener('submit', async e => {
	e.preventDefault()
	const name = document.getElementById('username').value

	console.log(name)
	console.log(id)

	try {
		const {
			data: { user },
		} = await axios.get(`/api/v1/users/${id}`)
		const { _id: userID, username, password } = user

		tempName = username

		if ((name = tempName)) {
			console.log('user exists')
			window.open('http://localhost:3000/user-overview', '_parent')
		} else {
			console.log("user doesn't exists")
		}
	} catch (error) {
		console.log(error)
	}
})
