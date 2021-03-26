#!/usr/bin/env yarn node
const { promisify } = require('util');
const exec  = promisify(require('child_process').exec);
const { resolve } = require('path');

const args = process.argv.slice(2);
const options = {
  bumpType: 'patch',
  dryRun: false,
  outputType: 'std'
};
const packages = new Set();
const rootDir = resolve(__dirname, '..');
let continueChecks = true;

args.forEach(arg => {
  switch (arg) {
  case '-n':
  case '--dry-run':
    options.dryRun = true;
    break;

  case '--json':
    options.outputType = 'json';
    break;

  case 'decline':
  case 'major':
  case 'minor':
  case 'patch':
  case 'premajor':
  case 'preminor':
  case 'prepatch':
  case 'prerelease':
    options.bumpType = arg;
    break;
  }
});

const bumpVersion = async (package, type) => {
  const { stdout, stderr } = await exec('ls');
};

const checkVersions = async () => {
  try {
    const {stdout, stderr } = await exec('yarn version check');
    continueChecks = false;
    log('No further version changes required.');
  } catch (err) {
    log(`Incrementing package ${options.bumpType} versions for:`);
    const packageMatches = err.stdout.matchAll(/workspace:packages\/([\w-]+)/g);
    for (const match of packageMatches) {
      packages.add(match[1]);
    }
    for (const package of packages) {
      if (options.dryRun) {
        log(`* ${package} - missing expected version bump`);
      } else {
        log(`* ${package}`);
        try {
          await exec('yarn run version:bump  || echo "No changes"', {
            cwd: `${rootDir}/packages/${package}`,
            env: {...process.env, BUMP_RELEASE_TYPE: options.bumpType},
          });
        } catch (bumpErr) {
          log(bumpErr.stdout, bumpErr.stderr);
          process.exit(1);
        }
      }
    }
  }
};

const log = (out, err) => {
  if (options.outputType == 'std') {
    if (out) console.log(out);
    if (err) console.error(err);
  }
};

const main = async () => {
  let maxLoops = 6;
  await checkVersions();

  // sometimes the bumps may actually trigger new changes
  while (!options.dryRun && continueChecks && maxLoops > 0) {
    maxLoops--;
    await checkVersions();
  }

  if (options.outputType == 'json') {
    console.log(JSON.stringify({
      options,
      packages: [...packages]
    }));
  }
};

main();
