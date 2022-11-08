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
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'result',
      tableName: 'result',
      timestamps: false
    });
  }
}
