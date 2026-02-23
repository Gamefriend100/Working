const { Router } = require('express');
const router = Router();

const { 
  getSupplies,
  updateSupply,
  deleteSupply,
  getSupplyById
} = require('../../controllers/safety');

router.get('/', getSupplies);
router.get('/:id', getSupplyById);
router.put('/:id', updateSupply);
router.delete('/:id', deleteSupply);

module.exports = router;