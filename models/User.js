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
      timestamps: false,
      indexes: [
        {
          name: 'PRIMARY',
          unique: true,
          using: 'BTREE',
          fields: [
            {
              name: 'id'
            }
          ]
        },
        {
          name: 'name',
          unique: true,
          using: 'BTREE',
          fields: [
            {
              name: 'name'
            },
            {
              name: 'email'
            },
            {
              name: 'phone'
            }
          ]
        },
        {
          name: 'user_fk1',
          using: 'BTREE',
          fields: [
            {
              name: 'level_id'
            }
          ]
        },
        {
          name: 'user_fk2',
          using: 'BTREE',
          fields: [
            {
              name: 'position_id'
            }
          ]
        },
        {
          name: 'user_fk3',
          using: 'BTREE',
          fields: [
            {
              name: 'manager_id'
            }
          ]
        }
      ]
    });
  }
}
