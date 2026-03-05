const { Router } = require('express');
const router = Router();

const {
  getRequest,
  getCreateRequest 
} = require('../../../controllers/safety/request/request.controller');

const {
  validateJWT
} = require('../../../middlewares/validate-jwt');

router.get('/', [validateJWT], getRequest);

router.post('/create', [validateJWT], getCreateRequest);


module.exports = router;
