const { Position, Department } = require('./../models');

const positionControllers = {
  getAll: (req, res) => {
    Position.findAll({
      include: [Department]
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
    Position.findOne({
      where: {
        id: req.params.id
      },
      include: [Department]
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
    Position.create(req.body)
      .then(dbData => res.json(dbData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  delete: (req, res) => {
    Position.destroy({
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
    Position.update(req.body, {
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

module.exports = positionControllers;
