const db = require('../../database/models');

const getKit = async (req, res) => {
  try {
    const kits = await db.SafKit.findAll({
      include: [
        { model: db.SafSupplies, as: 'supply', attributes: ['name'] },
        { model: db.Branch, as: 'branch', attributes: ['name'] },
      ],
    });

    const data = kits.map(kit => ({
      value: kit.id,
      label: `${kit.supply?.name || 'Sin supply'} - ${kit.branch?.name || 'Sin branch'}`,
      quantity: kit.quantity,
      supplyName: kit.supply?.name || null,
      branchName: kit.branch?.name || null,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error('Error al obtener los kits:', error);
    res.status(500).json({
      msg: 'Error al obtener los kits',
      error: error.message,
    });
  }
};

module.exports = { 
  getKit
 };