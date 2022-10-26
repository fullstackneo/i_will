module.exports = function (sequelize, DataTypes) {
  return sequelize.define('task', {
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
    I_will: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'task',
    timestamps: true,
    underscored: true

  });
};
