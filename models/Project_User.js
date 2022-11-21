const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Project_User.init(sequelize, DataTypes);
};

class Project_User extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      project_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'project',
          key: 'id'
        }
      },
      user_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        references: {
          model: 'user',
          key: 'id'
        }
      }
    }, {
      sequelize,
      modelName: 'project_user',
      tableName: 'project_user',
      timestamps: true
    });
  }
}
