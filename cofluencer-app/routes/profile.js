const express = require('express');
const router = express.Router();
const passport = require('passport');
const configurePassport = require('../helpers/passport');
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
const callInstagram = require('../helpers/middlewares').callInstagram;
/* eslint-enable */
const Company = require('../models/company');

/* GET users listing. */
router.get('/', isLoggedIn('/login'), (req, res, next) => {
  const userId = req.session.currentUser;

  console.log('currentUser ', req.session.currentUser);
  console.log('role ', req.session.role);

  Company.findById(userId)
    .then((company) => {
      res.render('profile', { company });
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/', (req, res, next) => {
  const igUserName = req.body.name;
  callInstagram(igUserName, (err, iguser) => {
    if (err) {
      console.log('err');
      res.render('profile', {});
    } else {
      console.log(iguser);
      res.render('profile', iguser);
    }
  });
});

module.exports = router;
