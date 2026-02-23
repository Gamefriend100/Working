//hacer el endpoin para traer todas las categorias
//intentar que la columna id renombrarla como value y la de name renombrarla como label
const db = require('../../database/models');

/* =========================
   OBTENER TODAS LAS CATEGORÍAS
========================= */
const getCategory = async (req, res) => {
  try {
    const categories = await db.SafCategorySupplies.findAll({
      attributes: [
        ['id', 'value'],
        ['name', 'label']
      ],
    });

    res.status(200).json(categories);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener categorías'
    });
  }
};

module.exports = {
  getCategory,
};