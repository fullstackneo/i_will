const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Access.init(sequelize, DataTypes);
};

class Access extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      role: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'role'
      },
      menu: {
        type: DataTypes.JSON,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'access',
      tableName: 'access',
      timestamps: false
    });
  }
}
