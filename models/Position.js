module.exports = function (sequelize, DataTypes) {
  return sequelize.define('position', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: 'name'
    },
    department_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'department',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'position',
    timestamps: false,
    underscored: true

  });
};
