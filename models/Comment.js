const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Comment.init(sequelize, DataTypes);
};

class Comment extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      post_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'post',
          key: 'id'
        }
      },
      content: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'comment',
      tableName: 'comment',
      timestamps: true
    });
  }
}
