const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Department.init(sequelize, DataTypes);
};

class Department extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: 'name'
      }
    }, {
      sequelize,
      modelName: 'department',
      tableName: 'department',
      timestamps: false
    });
  }
}
