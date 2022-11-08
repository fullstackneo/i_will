const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Position.init(sequelize, DataTypes);
};

class Position extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: 'name'
      },
      department_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'department',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'position',
      tableName: 'position',
      timestamps: false
    });
  }
}
