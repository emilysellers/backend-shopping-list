const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');

// TO DO - implement items CRUD
module.exports = Router().get('/', authenticate, async (req, res, next) => {
  try {
    const items = await Item.getAll(req.user.id);

    if (!items) {
      next();
    }
    res.json(items);
  } catch (e) {
    next(e);
  }
});
