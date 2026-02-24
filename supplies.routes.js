const { Router } = require('express');
const router = Router();
const { validateJWT } = require('../../middlewares/validate-jwt');

const { 
  getSupplies,
  updateSupply,
  deleteSupply,
  createSupplies,
} = require('../../controllers/safety');

router.get('/', [validateJWT], getSupplies);
router.put('/edit/:id', [validateJWT], updateSupply);
router.delete('/delete/:id', [validateJWT], deleteSupply);
router.post('/create',[validateJWT], createSupplies);

module.exports = router;