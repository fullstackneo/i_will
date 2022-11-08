const { Level } = require('./../models');
const levelControllers = {
  getAll: (req, res) => {
    Level.findAll({})
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
    Level.findOne({
      where: {
        id: req.params.id
      }
    }).then(dbData => {
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
    Level.create(req.body)
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  delete: (req, res) => {
    Level.destroy({
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
    Level.update(req.body, {
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

module.exports = levelControllers;
