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
      timestamps: true,
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
          name: 'task_fk1',
          using: 'BTREE',
          fields: [
            {
              name: 'user_id'
            }
          ]
        },
        {
          name: 'task_fk2',
          using: 'BTREE',
          fields: [
            {
              name: 'manager_id'
            }
          ]
        }
      ]
    });
  }
}
