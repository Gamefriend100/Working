const { Router } = require('express');
const router = Router();

const {
  getCategory,
} = require('../../controllers/safety/categorySupplies.controller');

router.get('/', getCategory);

module.exports = router;