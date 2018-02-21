const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
