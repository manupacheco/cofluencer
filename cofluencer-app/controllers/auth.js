const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const Company = require('../models/company');

exports.signupController = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username === '' || email === '' || password === '') {
    const error = 'User or password can not be empty';
    res.render('auth/signup', { error });
  } else {
    Company.findOne({ username })
      .then((company) => {
        if (!company) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);

          const newCompany = {
            username,
            email,
            password: hashPass,
          };

          Company.create(newCompany)
            .then((result) => {
              res.redirect('/');
            })
            .catch((err) => {
              const error = 'Something went wrong';
              res.render('auth/signup', { error });
            });
        } else {
          const error = 'This user already exists';
          res.render('auth/signup', { error });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};
