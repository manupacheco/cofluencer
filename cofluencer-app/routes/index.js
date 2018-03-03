const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
/* eslint-disable */
const isLoggedIn = require('../helpers/middlewares').isLoggedIn;
const EmailCtrl = require('../helpers/mail-controller').sendEmail;
/* eslint-enable */

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/email', (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'cofluencer@gmail.com',
      pass: 'bretonespacheco',
    },
  });

  transporter.sendMail(req.body, (error, info) => {
    if (error) {
      console.log(error);
      res.send(500, error.message);
    } else {
      console.log('Email sent');
      res.status(200).json(req.body);
    }
  });
});

module.exports = router;
