const bcrypt = require('bcrypt');
const bcryptSalt = 10;
const Company = require('../models/company');
const flash = require('connect-flash');

exports.signupController = (req, res, next) => {
  const { username, email, password } = req.body;

  if (username === '' || email === '' || password === '') {
    const error = 'User or password can not be empty';
    res.redirect('/', { error });
  } else {
    Company.findOne({ username })
      .then((company) => {
        if (!company) {
          const salt = bcrypt.genSaltSync(bcryptSalt);
          const hashPass = bcrypt.hashSync(password, salt);

          const infoUser = {
            username,
            email,
            password: hashPass,
            address: {
              street: '',
              city: '',
              state: '',
              zip: '',
            },
            bio: '',
            profileImage: '',
            socialLinks: [{}],
            tags: [],
          };

          Company.create(infoUser)
            .then((result) => {
              req.flash('success', 'You are now a Cofluencer Company, you can login with your credentials!');
              res.redirect('/');
            })
            .catch((err) => {
              const error = 'Something went wrong';
              res.redirect('/', { error });
            });
        } else {
          const error = 'This user already exists';
          res.render('/', { error });
        }
      })
      .catch((err) => {
        next(err);
      });
  }
};
