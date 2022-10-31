const { Comment, User, Post } = require('./../../models');
const router = require('express').Router();

router.get('/:id', (req, res) => {
  Comment.findOne({
    where: {
      id: req.params.id
    },
    attributes: {
      exclude: ['user_id', 'post_id']
    },
    include: [User, Post]
  })
    .then(dbData => {
      console.log(dbData);
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
});

router.post('/', (req, res) => {
  Comment.create(req.body)
    .then(dbData => {
      res.json(dbData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.delete('/:id', (req, res) => {
  Comment.destroy({
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
  Comment.update(req.body, {
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
