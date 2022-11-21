const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Project.init(sequelize, DataTypes);
};

class Project extends Sequelize.Model {
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
      manager_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'user',
          key: 'id'
        }
      },
      team: {
        type: DataTypes.JSON,
        defaultValue: "['']"
      }
    }, {
      sequelize,
      modelName: 'project',
      tableName: 'project',
      timestamps: true
    });
  }
}
