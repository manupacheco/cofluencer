const express = require('express');
const router = express.Router();
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

const EmailCtrl = require('../helpers/mail-controller').sendEmail;

router.post('/email', EmailCtrl, (req, res, nect) => {
  res.redirect('index');
});

module.exports = router;
