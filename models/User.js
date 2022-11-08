const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');
module.exports = (sequelize, DataTypes) => {
  return User.init(sequelize, DataTypes);
};

class User extends Sequelize.Model {
  checkPassword (loginPW) {
    return bcrypt.compareSync(loginPW, this.password);
  }

  static init (sequelize, DataTypes) {
    return super.init({
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING(40),
        allowNull: false
      },
      email: {
        type: DataTypes.STRING(40),
        unique: true,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      phone: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      linkedin_url: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      access_id: {
        type: DataTypes.TINYINT.UNSIGNED,
        allowNull: true,
        reference: {
          model: 'access',
          key: 'id'
        }
      },
      level_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'level',
          key: 'id'
        }
      },
      position_id: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'position',
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
      }
    }, {
      hooks: {
        async beforeCreate (newUserData) {
          newUserData.password = await bcrypt.hash(newUserData.password, 10);
          return newUserData;
        },
        async beforeUpdate (updatedUserData) {
          updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
          return updatedUserData;
        }
      },
      sequelize,
      modelName: 'user',
      tableName: 'user',
      timestamps: false
    });
  }
}
