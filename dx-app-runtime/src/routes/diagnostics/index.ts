import * as fs from "fs";
import {Router} from "express";
const router = Router();

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
  fs.readFileSync('madeupgarbage');
});

export default router;

