---
title: Installing NodeJS
---
# Installing NodeJS
## What is Node.js?
Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.

## Installing Node Directly
Refer to the [official installation documentation](https://nodejs.org/en/download/)

## Node Version Manager
A useful tool for managing installed versions of NodeJS on your computer is `nvm` or Node Version Manager.
To install nvm please follow the guide associated with your operating system
- [Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows)
- [Mac (Apple Silicon)](https://dev.to/httpjunkie/setup-node-version-manager-nvm-on-mac-m1-7kl)
- [Mac (Intel)](https://dev.to/carloswhite/how-to-reliably-install-node-js-using-nvm-on-macos-12j0)
- [Linux](https://tecadmin.net/how-to-install-nvm-on-ubuntu-20-04/)

After installing nvm you can use the following commands to install and select the current active version of NodeJS
```bash
nvm install "16.14.2"
```
followed by 
```bash
nvm use "16.14.2"
```
Then check to make sure that node was installed properly by running the command
```bash
node --version
```
