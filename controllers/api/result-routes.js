const { Result, Task } = require('./../../models');
const router = require('express').Router();

router.get('/', (req, res) => {
  Result.findAll({
    attributes: {
      exclude: []
    }
    // include: [Task]
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
  Result.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: []
    },
    include: [Task]
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
  Result.create(req.body)
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Result.destroy({
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
});

router.put('/:id', (req, res) => {
  Result.update(req.body, {
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
