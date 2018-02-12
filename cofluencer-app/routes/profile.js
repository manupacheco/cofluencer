const express = require('express');
const router = express.Router();

const Company = require('../models/company');
const authRedirect = require('../middlewares/auth');

/* GET users listing. */
router.get('/', authRedirect('/login'), (req, res, next) => {
  const userId = req.session.currentUser;

  Company.findById(userId)
    .then((company) => {
      res.render('profile', { company });
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
