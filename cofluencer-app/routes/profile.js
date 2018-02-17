const express = require('express');
const router = express.Router();
const passport = require('passport');
const configurePassport = require('../helpers/passport');
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
/* eslint-enable */
const Company = require('../models/company');

/* GET users listing. */
router.get('/', isLoggedIn('/login'), (req, res, next) => {
  // const userId = req.session.passport.user.id;
  const user = req.user;
  console.log('user in render: ', user);
  res.render('profile', user);

  // Company.findById(userId)
  //   .then((company) => {
  //     console.log(company);
  //     res.render('profile', company);
  //   })
  //   .catch((err) => {
  //     next(err);
  //   });
});

module.exports = router;
