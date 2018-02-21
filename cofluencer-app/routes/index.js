const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */

/* GET home page. */
router.get('/', isLoggedIn('/'), (req, res, next) => {
  res.redirect('/validate');
});

module.exports = router;
