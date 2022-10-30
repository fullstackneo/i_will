const { Task, User } = require('./../../models');
const router = require('express').Router();

router.get('/', (req, res) => {
  Task.findAll({
    include: [{
      model: User,
      as: 'belongsTo'
    }, {
      model: User,
      as: 'assignedBy'
    }]
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
  Task.findOne({
    where: {
      id: req.params.id
    },
    include: [{
      model: User,
      as: 'belongsTo'
    }, {
      model: User,
      as: 'assignedBy'
    }]
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
  Task.create(req.body)
    .then(dbData => res.json(dbData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Task.destroy({
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
  Task.update(req.body, {
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

// team-member update i_will area
router.put('/:id', (req, res) => {
  Task.update({ i_will: req.body.i_will }, {
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
