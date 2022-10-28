const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Level.init(sequelize, DataTypes);
};

class Level extends Sequelize.Model {
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
      tableName: 'level',
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
        }
      ]
    });
  }
}
