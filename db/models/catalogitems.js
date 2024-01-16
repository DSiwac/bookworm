'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CatalogItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Users, { foreignKey: 'userId' });
      this.belongsTo(models.Books, { foreignKey: 'userId' });
      this.hasMany(models.Comments, { foreignKey: 'catalogItemsId' });
      this.hasMany(models.FavoriteItems, { foreignKey: 'catalogItemsId' });
      this.hasMany(models.Ratings, { foreignKey: 'catalogItemsId' });
    }
  }
  CatalogItems.init({
    bookId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CatalogItems',
  });
  return CatalogItems;
};