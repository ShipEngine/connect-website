const router = require('express').Router();
const { data } = require('../../integration');

router.get('/GetRegistryData', (req, res) => {
  res.send(data);
});

module.exports = router;
