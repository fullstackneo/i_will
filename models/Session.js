const Sequelize = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  return Session.init(sequelize, DataTypes);
};

class Session extends Sequelize.Model {
  static init (sequelize, DataTypes) {
    return super.init({
      sid: {
        type: DataTypes.STRING(36),
        allowNull: false,
        primaryKey: true
      },
      expires: {
        type: DataTypes.DATE,
        allowNull: true
      },
      data: {
        type: DataTypes.TEXT,
        allowNull: true
      }
    }, {
      sequelize,
      tableName: 'session',
      modelName: 'session',
      timestamps: true
    });
  }
}
