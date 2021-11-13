import "axios";
import "../../css/login.scss";
$(() => {
	const element = document.getElementById("usernameerror");

	function loginError() {
		element.style.fontSize = "14px";
		element.style.position = "fixed";
		element.style.top = "180px";
		element.style.left = "60px";
		element.style.visibility = "visible";
		element.textContent = "Incorrect username or password";
		console.log("usernameerror");
	}

	document.addEventListener("submit", async (e) => {
		e.preventDefault();
		try {
			username = document.getElementById("username").value;
			password = document.getElementById("password").value;
			console.log(username);
			console.log(password);
			const auth = await axios.post("/api/v1/users/login", {
				username,
				password,
			});

			if (auth) {
				console.log("login succesful");
				window.open("http://localhost:3000/user-overview", "_parent");
			} else {
				loginError();
			}
		} catch (error) {
			console.log(error);
			loginError();
			setTimeout(() => {
				element.style.visibility = "hidden";
			}, 5000);
		}
	});
});
