const FB = require('fb');

exports.notifications = (req, res, next) => {
  res.locals.errorMessages = req.flash('error');
  res.locals.infoMessages = req.flash('info');
  res.locals.dangerMessages = req.flash('danger');
  res.locals.successMessages = req.flash('success');
  res.locals.warningMessages = req.flash('warning');
  next();
};

exports.isLoggedIn = redirect => (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.redirect(redirect);
  }
};

exports.callInstagram = (igUserName, cb) => {
  FB.api(
    '/17841407080190618',
    {
      fields: `business_discovery.username( ${igUserName} ){username,biography,website,followers_count,media_count,media{caption, comments_count,like_count, media_url, media_type}}`,
      // incluir token en variable actual caduca 13 de abril de 2018.
      access_token: 'EAAZAp8OJ3y18BAAcfi7TMWZBVXkw8uHZAitgIQUWCvUI7hEbaNpeGTXLXyuZB9huheP84iiz1w8vY3ZC0tpxcoJOdWRilc9NPzNAo3zf9hpZC59fghyRRzG6c6KbzjFeYKVRD0GywHFhFQwYMMnZAO7PW5roFrcuTtLr0f0GihCh5QhghFdfPte',
    },
    (iguser) => {
      if (!iguser || iguser.error) {
        console.log(!iguser ? 'error occurred' : iguser.error);
        cb(iguser.error);
      } else {
        console.log('res ig', iguser);
        cb(null, { iguser });
      }
    },
  );
};
