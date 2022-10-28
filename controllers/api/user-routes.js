const { Level } = require('./../../models');
const router = require('express').Router();
router.get('/', (req, res) => {
  Level.findAll().then(data => res.json(data));
});
module.exports = router;
