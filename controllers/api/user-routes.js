const { User, Post, Comment, Position, Department } = require('./../../models');
const router = require('express').Router();

router.get('/', (req, res) => {
  User.findAll({
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
});

router.get('/:id', (req, res) => {
  User.findOne({
    where: {
      id: req.params.id
    },
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
  User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone
  })
    .then(dbData => {
      // req.session.save(() => {
      req.session.user_id = dbData.id;
      req.session.name = dbData.name;
      req.session.loggedIn = true;
      res.json(dbData);
      // });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.put('/:id', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  // pass in req.body instead to only update what's passed through
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
});

router.delete('/:id', (req, res) => {
  User.destroy({
    where: {
      id: req.params.id
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
});

router.post('/login', (req, res) => {
  // expects {email: 'lernantino@gmail.com', password: 'password1234'}
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((dbUserData) => {
    if (!dbUserData) {
      res.status(400).json({ message: 'No user with that email address!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password!' });
      return;
    }
    // req.session.save(() => {
    // declare session variables
    req.session.user_id = dbUserData.id;
    req.session.username = dbUserData.name;
    req.session.loggedIn = true;
    // });

    res.json({
      user: dbUserData,
      message: 'You are now logged in!'
    });
  });
});

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
