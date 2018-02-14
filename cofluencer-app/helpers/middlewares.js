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
