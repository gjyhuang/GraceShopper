const isAdminMiddlware = (req, res, next) => {
  const currentUser = req.user;

  if (currentUser && currentUser.isAdmin) {
    next();
  } else {
    const error = new Error('Illegal Authorization');
    error.status = 401;
    next(error);
  }
};

module.export = isAdminMiddlware;
