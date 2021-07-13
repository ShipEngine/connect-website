#!/usr/bin/env yarn node
const { accessSync } = require('fs');
const { promisify } = require('util');
const exec  = promisify(require('child_process').exec);
const { resolve } = require('path');

if (process.argv.length < 3 || !process.argv[2]) {
  console.log('Package reqired.');
  console.log('Usage:');
  console.log(`\t${process.argv[1]} packageName`);
  process.exit(64);
}

const packageJsonFile = resolve(`${process.argv[1]}/../../packages/${process.argv[2]}/package.json`);

try {
  accessSync(packageJsonFile);
} catch (err) {
  console.error(`${packageJsonFile} does not exist or is inaccessible.`);
  process.exit(64);
}

const main = async () => {
  let exitCode = 0;
  try {
    const packageJson = require(packageJsonFile);
    const { stdout, stderr } = await exec(`npm view ${packageJson.name} versions --json`);
    const publishedVersions = JSON.parse(stdout);
    if (publishedVersions.includes(packageJson.version)) {
      console.log(`${packageJson.name} v${packageJson.version} already published.`);
      exitCode = 1;
    }
  } catch (err) {
    exitCode = 1;
    if (err.stdout) {
      const errObj = JSON.parse(err.stdout).error;
      console.error(errObj.summary);
      if (errObj.code === "E404") {
        // If a package does not exist in the registry at all, allow publish to continue
        exitCode = 0;
      }
    } else {
      console.error(err);
    }
  }
  process.exit(exitCode);
};

main();
