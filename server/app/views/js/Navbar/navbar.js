// exmaple of how to change nav elements from the server
import "../../assets/scss/components/_navbar.scss";
$(function () {
	$("#login").on("click", function () {
		$.ajax({
			type: "POST",
			url: "/page/login",
			data: { login: true },
			success: () => {
				window.location.href = "/page/";
			},
		});
	});
});
