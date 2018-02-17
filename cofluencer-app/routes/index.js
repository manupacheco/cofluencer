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

router.post('/', (req, res, next) => {
  const igUserName = req.body.name;
  callInstagram(igUserName, (err, iguser) => {
    if (err) {
      console.log(err);
    } else {
      console.log('para render: ', iguser);
      res.render('index', iguser);
    }
  });
});

module.exports = router;
