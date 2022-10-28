const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Post.init(sequelize, DataTypes);
};

class Post extends Sequelize.Model {
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
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'post',
      timestamps: true,
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
          name: 'user_id',
          using: 'BTREE',
          fields: [
            { name: 'user_id' }
          ]
        },
        {
          name: 'task_id',
          using: 'BTREE',
          fields: [
            { name: 'task_id' }
          ]
        }
      ]
    });
  }
}
