/* eslint-disable no-undef */
// exmaple of how to change nav elements from the server
import '../../assets/scss/components/_navbar.scss';

$(() => {
  $('#login').on('click', () => {
    $.ajax({
      type: 'POST',
      url: '/page/login',
      data: { login: true },
      success: () => {
        window.location.href = '/page/';
      },
    });
  });
});
