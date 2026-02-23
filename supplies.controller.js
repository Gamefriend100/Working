const db = require("../../database/models");

/* =========================
   OBTENER TODOS
========================= */
const getSupplies = async (req, res) => {
  try {
    const supplies = await db.SafSupplies.findAll({
      order: [['id', 'ASC']]
    });

    res.status(200).json(supplies);

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al obtener insumos"
    });
  }
};

const getSupplyById = async (req, res) => {
  try {
    const { id } = req.params;

    const supply = await db.SafSupplies.findByPk(id);

    if (!supply) {
      return res.status(404).json({
        msg: "Insumo no encontrado"
      });
    }

    res.status(200).json(supply);

  } catch (error) {
    res.status(500).json({
      msg: "Error al obtener insumo"
    });
  }
};

/* =========================
   ACTUALIZAR
========================= */
const updateSupply = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      identifier,
      name,
      specification,
      categoryId
    } = req.body;

    const supply = await db.SafSupplies.findByPk(id);

    if (!supply) {
      return res.status(404).json({
        msg: "Insumo no encontrado"
      });
    }

    await supply.update({
      identifier,
      name,
      specification,
      categoryId
    });

    res.status(200).json({
      msg: "Insumo actualizado correctamente",
      supply
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al actualizar insumo"
    });
  }
};

/* =========================
   ELIMINAR
========================= */
const deleteSupply = async (req, res) => {
  try {
    const { id } = req.params;

    const supply = await db.SafSupplies.findByPk(id);

    if (!supply) {
      return res.status(404).json({
        msg: "Insumo no encontrado"
      });
    }

    await supply.destroy();

    res.status(200).json({
      msg: "Insumo eliminado correctamente"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "Error al eliminar insumo"
    });
  }
};

module.exports = {
  getSupplies,
  updateSupply,
  deleteSupply,
  getSupplyById,
};