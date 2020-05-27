const router = require('express').Router();

router.get('/version', (req, res) => {
  res.send({
    git_branch: process.env.GIT_BRANCH || 'Branch N/A',
    git_sha: process.env.GIT_SHA || 'SHA N/A'
  });
});

router.get('/readiness', (req, res) => {
  res.status(204).send();
});

router.get('/liveness', (req, res) => {
  res.status(204).send();
});

router.get('/exception', (req, res) => {
  const fs = require('fs');
  fs.readFileSync('madeupgarbage');
});


module.exports = router;
