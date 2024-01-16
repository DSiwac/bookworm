'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FavoriteItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.CatalogItems, { foreignKey: 'catalogItemId' });
    }
  }
  FavoriteItems.init({
    userId: DataTypes.INTEGER,
    catalogItemId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'FavoriteItems',
  });
  return FavoriteItems;
};