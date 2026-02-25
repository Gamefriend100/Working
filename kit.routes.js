const { Router } = require('express');
const router = Router();

const { getKit } = require('../../controllers/safety/kit.controller');

// GET todos los kits
router.get('/', getKit);

module.exports = router;