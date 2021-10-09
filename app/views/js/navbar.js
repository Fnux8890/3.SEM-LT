$(function () {
  $("#login").on("click", function () {
    $.ajax({
      type: "POST",
      url: "/login",
      data: { login: true },
      success: () => {
        window.location.href = "/";
      },
    });
  });
});
