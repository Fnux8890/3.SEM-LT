/* eslint-disable no-undef */
import * as axios from 'axios';
import '../../assets/scss/layouts/login.scss';

$(() => {
  const element = document.getElementById('usernameerror');

  function loginError() {
    element.style.fontSize = '14px';
    element.style.position = 'fixed';
    element.style.top = '180px';
    element.style.left = '60px';
    element.style.visibility = 'visible';
    element.textContent = 'Incorrect username or password';
  }

  document.addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
      const auth = await axios.default.post('/api/v1/users/login', {
        username,
        password,
      });

      if (auth) {
        window.location.assign('http://localhost:3000/page/module-overview');
      } else {
        loginError();
      }
    } catch (error) {
      loginError();
      setTimeout(() => {
        element.style.visibility = 'hidden';
      }, 5000);
    }
  });
});
