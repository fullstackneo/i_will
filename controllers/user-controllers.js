const sequelize = require('../config/connection');
const { getTeamIds } = require('../utils/helpers');
const { User, Post, Comment, Position, Department, Access } = require('./../models');
const userControllers = {
  getAll: async (req, res) => {
    // hr retrieve all staff
    // manager retrieve teams
    let where = {};

    if (req.session.role === 'manager') {
      const ids = await getTeamIds(req.session.user_id);
      where = { id: ids };
    }

    User.findAll({
      where,
      attributes: {
        exclude: ['password', 'manager_id', 'position_id', 'level_id']
      },
      include: [{
        model: User, as: 'manager', attributes: ['name']
      }, {
        model: User, as: 'team', attributes: ['name']
      }, {
        model: Post, include: Comment
      }, {
        model: Position, include: Department
      }, {
        model: Access
      }]
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({
            message: 'No data found!'
          });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  getById: async (req, res) => {
    // const id = parseInt(req.params.id);
    // const role = req.session.role;
    // const roleId = parseInt(req.session.user_id);
    // 'staff' can retrieve his/her own info
    // manager can retrieve his teammember
    // hr can retrieve anyone
    // if (role === 'staff' && roleId !== id) {
    //   return res.status(400).json({ message: 'unauthorized action failed!' });
    // } else if (role === 'manager') {
    //   const teamIds = await getTeamIds(roleId);

    //   // 'manager' can only info his team members or himself
    //   if (!teamIds.includes(id) && roleId !== id) return res.status(400).json({ message: 'unauthorized action failed!' });
    // }

    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: {
        exclude: ['password', 'manager_id', 'position_id', 'level_id']
      },
      include: [
        { model: User, as: 'manager', attributes: ['name'] },
        { model: User, as: 'team', attributes: ['name'] },
        { model: Post, include: Comment },
        { model: Position, include: Department },
        { model: Access }]
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({
            message: 'No data found!'
          });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        res.status(500).json(err);
      });
  },

  updateOne: (req, res) => {
    // hr update anyone's all info
    // others update his own basic info
    const roleId = parseInt(req.session.user_id);
    if (req.session.role !== 'hr') {
      if (roleId !== req.params.id) return res.status(400).json({ message: 'unauthorized action failed!' });
      req.body = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        linkedin_url: req.body.linkedin_url
      };
    }

    User.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then((dbUserData) => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  deleteOne: async (req, res) => {
    const id = parseInt(req.params.id);
    const role = req.session.role;
    const roleId = parseInt(req.session.user_id);

    // hr delete any user
    // otheres can only delete himself
    if (role !== 'hr' && roleId !== req.params.id) {
      return res.status(400).json({ message: 'unauthorized action failed!' });
    }

    await User.destroy({
      where: {
        id
      }
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  },

  createOne: async (req, res) => {
  // return error message if the session already exists
    // if (await isSameSession(req.sessionID)) {
    //   return res.status(400).json({ message: 'invalid request' });
    // }

    User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      linkedin_url: req.body.linkedin_url
    })
      .then(async dbData => {
      // req.session.save(() => {
        req.session.user_id = dbData.id;
        req.session.name = dbData.name;
        req.session.loggedIn = true;
        // // });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  login: async (req, res) => {
    try {
      if (req.session.loggedIn) { return res.status(204).end(); }

      const loginUser = await User.findOne({
        where: {
          email: req.body.email
        },
        include: Access
      });

      if (!loginUser) {
        return res.status(400).json({ message: 'username or password not correct!' });
      }

      const validPassword = loginUser.checkPassword(req.body.password);

      if (!validPassword) {
        return res.status(400).json({ message: 'username or password not correct!' });
      }

      // req.session.save(() => {
      // declare session variables
      req.session.user_id = loginUser.id;
      req.session.username = loginUser.name;
      req.session.loggedIn = true;
      req.session.role = loginUser.access.role;

      await User.update({ online: true }, {
        where: { id: req.session.user_id }
      });
      res.json({
        user: { ...loginUser.get({ plain: true }), online: true },
        message: 'You are now logged in!'
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  logout: async (req, res) => {
    try {
      if (!req.session.loggedIn) {
        return res.status(204).end();
      }

      await User.update({ online: false }, {
        where: {
          id: req.session.user_id
        }
      });

      req.session.destroy(async () => {
        res.json({ message: 'you have logged out!' });
      });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
};

module.exports = userControllers;
