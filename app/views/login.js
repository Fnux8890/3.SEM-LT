//params = window.location.search

//const id = new URLSearchParams(params).get('id')
let tempName
//console.log(id)
$(() => {
const GetAllUsers = async() => {
try {
const {
	data: { users },
} = await axios.get('/api/v1/users');
console.log(users)

$.getJSON('/api/v1/users',(data)=> {
	console.log(data);

})


const getUsers = users.map((user) => {
	const { _id: userID, username, password } = user
	console.log(user)
}).join('')
}
catch(error) {
	console.log(error)
}
}
GetAllUsers()

document.addEventListener('submit', async e => {
	e.preventDefault()
	const name = document.getElementById('username').value

	console.log(name)	

	try {

		if ((name == tempName)) {
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
