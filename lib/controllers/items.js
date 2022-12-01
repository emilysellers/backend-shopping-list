const { Router } = require('express');
const Item = require('../models/Item');
const authenticate = require('../middleware/authenticate');

// TO DO - implement items CRUD
module.exports = Router()
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);

      if (!items) {
        next();
      }
      res.json(items);
    } catch (e) {
      next(e);
    }
  })
  .post('/', authenticate, async (req, res, next) => {
    try {
      const newItem = await Item.insert({
        description: req.body.description,
        qty: req.body.qty,
        user_id: req.user.id,
      });
      res.json(newItem);
    } catch (e) {
      next(e);
    }
  })
  .put('/:id', authenticate, async (req, res, next) => {
    try {
      const updateItem = await Item.updateById(
        req.params.id,
        req.body,
        req.user.id
      );
      res.json(updateItem);
    } catch (e) {
      next(e);
    }
  });
