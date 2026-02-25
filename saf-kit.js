'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SafKit extends Model {
    static associate(models) {
      // Asociación con Branch
      SafKit.belongsTo(models.Branch, {
        foreignKey: 'branchId',
        as: 'branch', // alias usado en include
      });

      // Asociación con SafSupplies
      SafKit.belongsTo(models.SafSupplies, {
        foreignKey: 'supplyId',
        as: 'supply', // alias usado en include
      });
    }

    toJSON() {
      const { createdAt, updatedAt, ...data } = this.get();
      return data;
    }
  }

  SafKit.init(
    {
      supplyId: DataTypes.INTEGER,
      branchId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'SafKit',
      tableName: 'saf_kits',
    }
  );

  return SafKit;
};