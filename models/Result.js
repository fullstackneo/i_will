module.exports = function (sequelize, DataTypes) {
  return sequelize.define('result', {
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
    tableName: 'result',
    timestamps: false,
    underscored: true

  });
};
