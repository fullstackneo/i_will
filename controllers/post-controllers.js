const { Post, Task, User } = require('./../models');

const postControllers = {
  getAll: (req, res) => {
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: {
        exclude: []
      },
      include: [Task, User]
    })
      .then(dbData => {
        if (!dbData) {
          res.status(404).json({
            message: 'No data found'
          });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  getById: (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      include: [Task, User]
    })
      .then(dbData => {
        console.log(dbData);
        if (!dbData) {
          res.status(404).json({
            message: 'No data found'
          });
          return;
        }
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  create: (req, res) => {
    Post.create(req.body)
      .then(dbData => {
        res.json(dbData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  delete: (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then((dbData) => {
        if (!dbData) {
          res.status(404).json({ message: 'No data found' });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  update: (req, res) => {
    Post.update(req.body, {
      where: {
        id: req.params.id
      }
    })
      .then((dbData) => {
        if (!dbData[0]) {
          res.status(404).json({ message: 'No data found' });
          return;
        }
        res.json(dbData);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  }

};
module.exports = postControllers;
