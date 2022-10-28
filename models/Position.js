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
      tableName: 'position',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'id' }
          ]
        },
        {
          name: 'name',
          unique: true,
          using: 'BTREE',
          fields: [
            { name: 'name' }
          ]
        },
        {
          name: 'department_id',
          using: 'BTREE',
          fields: [
            { name: 'department_id' }
          ]
        }
      ]
    });
  }
}
