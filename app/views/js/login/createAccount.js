/* eslint-disable no-undef */
import '../../assets/scss/layouts/createAccount.scss';
import * as axios from 'axios';

$(() => {
  const element = document.getElementById('usernameerror');

  function passwordError() {
    element.style.fontSize = '14px';
    element.style.position = 'fixed';
    element.style.top = '320px';
    element.style.left = '80px';
    element.style.visibility = 'visible';
    element.textContent = "Password doesn't match";
  }

  function usernameError() {
    element.style.fontSize = '14px';
    element.style.position = 'fixed';
    element.style.top = '180px';
    element.style.left = '75px';
    element.style.visibility = 'visible';
    element.textContent = 'Username already exists';
  }

  document.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById('password').value;
    const confirm = document.getElementById('confirmpassword').value;

    if (password === confirm) {
      try {
        const username = document.getElementById('username').value;
        await axios.default.post('/api/v1/users', { username, password });
        window.open('http://localhost:3000/page/module-overview', '_parent');
      } catch (error) {
        usernameError();
        setTimeout(() => {
          element.style.visibility = 'hidden';
        }, 5000);
      }
    } else {
      passwordError();
      setTimeout(() => {
        element.style.visibility = 'hidden';
      }, 5000);
    }
  });
});
