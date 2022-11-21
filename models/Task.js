const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Task.init(sequelize, DataTypes);
};

class Task extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      title: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      project_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        references: {
          model: 'project',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      manager_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      objective: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      i_will: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    }, {
      sequelize,
      modelName: 'task',
      tableName: 'task',
      timestamps: true
    });
  }
}
