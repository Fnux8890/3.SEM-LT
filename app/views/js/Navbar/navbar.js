import $ from "jquery";
// exmaple of how to change nav elements from the server
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
