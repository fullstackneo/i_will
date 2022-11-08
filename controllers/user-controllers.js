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
        model: User, as: 'team_members', attributes: ['name']
      }, {
        model: Post, include: Comment
      }, {
        model: Position, include: Department
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
    const id = parseInt(req.params.id);
    const role = req.session.role;
    const roleId = parseInt(req.session.user_id);
    // 'staff' can retrieve his/her own info
    // manager can retrieve his teammember
    // hr can retrieve anyone
    if (role === 'staff' && roleId !== id) {
      return res.status(400).json({ message: 'unauthorized action failed!' });
    } else if (role === 'manager') {
      const teamIds = await getTeamIds(roleId);

      // 'manager' can only info his team members or himself
      if (!teamIds.includes(id) && roleId !== id) return res.status(400).json({ message: 'unauthorized action failed!' });
    }

    User.findOne({
      where: {
        id: req.params.id
      },
      attributes: {
        exclude: ['password', 'manager_id', 'position_id', 'level_id']
      },
      include: [
        { model: User, as: 'manager', attributes: ['name'] },
        { model: User, as: 'team_members', attributes: ['name'] },
        { model: Post, include: Comment },
        { model: Position, include: Department }]
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

  update: (req, res) => {
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

  delete: async (req, res) => {
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

  create: async (req, res) => {
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
        // await Position.findOne({ where: { id: dbData.position_id }, include: [Access] })
        //   .then(role => { req.session.role = role.get({ plain: true }).access.role; });
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  login: (req, res) => {
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(async (dbUserData) => {
      if (!dbUserData) {
        res.status(400).json({ message: 'username or password not correct!' });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        res.status(400).json({ message: 'username or password not correct!' });
        return;
      }
      // req.session.save(() => {
      // declare session variables
      req.session.user_id = dbUserData.id;
      req.session.username = dbUserData.name;
      req.session.loggedIn = true;

      await Access.findOne({ where: { id: dbUserData.access_id } })
        .then(role => { req.session.role = role.get({ plain: true }).role; });
      // });

      res.json({
        user: dbUserData,
        message: 'You are now logged in!'
      });
    });
  },

  logout: (req, res) => {
  // if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  // } else {
  //   res.status(404).end();
  // }
  }
};

;

module.exports = userControllers;
