const router = require('express').Router();
router.get('/', (req, res) => {
  res.json('haha');
});
module.exports = router;
