module.exports = function (sequelize, DataTypes) {
  return sequelize.define('level', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: 'name'
    }
  }, {
    sequelize,
    tableName: 'level',
    timestamps: false,
    underscored: true

  });
};
