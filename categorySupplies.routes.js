const { Router } = require('express');
const router = Router();
const { validateJWT } = require('../../middlewares/validate-jwt');

const {
  getCategory,
} = require('../../controllers/safety/categorySupplies.controller');

router.get('/',[validateJWT], getCategory);

module.exports = router;