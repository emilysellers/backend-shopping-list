const Item = require('../models/Item');

module.exports = async (req, res, next) => {
  const item = await Item.getById(req.params.id);
  try {
    if (req.user && req.user.id === item.user_id) {
      next();
    } else {
      throw new Error('You do not have access to edit this item');
    }
  } catch (err) {
    err.status = 403;
    next(err);
  }
};
