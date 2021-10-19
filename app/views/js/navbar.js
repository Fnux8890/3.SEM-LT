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
