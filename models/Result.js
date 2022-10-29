const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Result.init(sequelize, DataTypes);
};

class Result extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      task_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'task',
          key: 'id'
        }
      },
      score: {
        type: DataTypes.TINYINT,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'result',
      tableName: 'result',
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            {
              name: 'id'
            }
          ]
        },
        {
          name: 'result_fk1',
          using: 'BTREE',
          fields: [
            {
              name: 'task_id'
            }
          ]
        }
      ]
    });
  }
}
