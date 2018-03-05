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
      access_token: 'EAAZAp8OJ3y18BAMZAornnd1VmZC7FxzD4JFgZCUk2ZBeXKq1I61fCuczUZB3DZAk5gZBxiomGpAYEbwnZBJTJZBrvaiEGZCcy5XgT9ZAjKuNm56K0wVJ3F5NF0Q1lSzEJiIxFvD4y3hLRU5idql4ZAQdrEaIv0V31QQUR1BQTC0FGbelkCgZDZD',
    },
    (igUser) => {
      if (!igUser || igUser.error) {
        console.log(!igUser ? 'error occurred' : igUser.error);
        cb(igUser.error);
      } else {
        cb(null, igUser.business_discovery);
      }
    },
  );
};

exports.updateProfilePic = (igUserId, cb) => {
  FB.api(
    `/${igUserId}`,
    {
      fields: 'profile_picture_url',
      access_token: 'EAAZAp8OJ3y18BAMZAornnd1VmZC7FxzD4JFgZCUk2ZBeXKq1I61fCuczUZB3DZAk5gZBxiomGpAYEbwnZBJTJZBrvaiEGZCcy5XgT9ZAjKuNm56K0wVJ3F5NF0Q1lSzEJiIxFvD4y3hLRU5idql4ZAQdrEaIv0V31QQUR1BQTC0FGbelkCgZDZD',
    },
    (picUrl) => {
      if (!picUrl || picUrl.error) {
        console.log(!picUrl ? 'error occurred' : picUrl.error);
        cb(picUrl.error);
      } else {
        cb(null, picUrl.profile_picture_url);
      }
    },
  );
};
