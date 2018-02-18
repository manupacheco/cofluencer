const express = require('express');
const router = express.Router();
// const FB = require('fb');
/* eslint-disable */
const callInstagram = require('../helpers/middlewares').callInstagram;
/* eslint-enable */

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

module.exports = router;
