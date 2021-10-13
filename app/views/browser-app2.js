const id = new URLSearchParams(params).get('id')
const name = document.getElementById('username').value

document.addEventListener('submit', async e => {
	e.preventDefault()
	

	console.log(name)
	if (name)
		try {
			const {
				data: { user }, 
			} = await axios.get(`/api/v1/users/${id}`)
			const {_id: userID, username, password} = user
			console.log('user exists')
			//window.open('http://localhost:3000/user-overview', '_parent')
		} catch (error) {
			console.log(error)
			
		}
	else {
		console.log("user doesn't exist")
	}
})
