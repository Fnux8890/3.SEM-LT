import { default as axios } from "axios";
import "../../assets/scss/layouts/login.scss";
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
			let username = document.getElementById("username").value;
			let password = document.getElementById("password").value;
			console.log(username);
			console.log(password);
			const auth = await axios.post("/api/v1/users/login", {
				username,
				password,
			});

			console.log(auth);

			if (auth) {
				console.log("login succesful");
				/*window.location.assign(
					'http://localhost:3000/page/module-overview'
				);*/
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
