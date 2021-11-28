const express = require('express');

const router = express.Router();
const logedIn = false;

// this is a test
router.get('/index', (req, res) => {
  res.render('index', {
    logedIn,
  });
  res.end();
});

module.exports = router;
