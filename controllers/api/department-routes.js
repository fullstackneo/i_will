const { Department } = require('./../../models');
const router = require('express').Router();

router.get('/', (req, res) => {
  Department.findAll({
    order: [['id', 'DESC']]
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
});

router.get('/:id', (req, res) => {
  Department.findOne({
    where: {
      id: req.params.id
    }
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
});

router.post('/', (req, res) => {
  Department.create(req.body)
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Department.destroy({
    where: {
      id: req.params.id
    },
    truncate: true,
    // cascade: true,
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
});

router.put('/:id', (req, res) => {
  Department.update(req.body, {
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
});

module.exports = router;
