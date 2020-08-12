---
hidden: true
id: devtools
title: Recommended ShipEngine Connect Development Tools
description: A quick overview of the recommended IDE's and Development tools that are available for your app development.
tags:
- ShipEngine
- ShipEngine Connect
- IDEs
- programming
css: style.css
---

Developer Tools
=================
There are many great developer tools for working with [JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript) and [TypeScript](https://www.typescriptlang.org/). Even better, most of them are free and open source. Here are a few that we really like here at ShipEngine:

<div class="tool-list">

- [![VSCode](vscode.svg)](https://code.visualstudio.com/) <a href="https://code.visualstudio.com/" class="list-title">Visual Studio Code</a><br>
Visual Studio Code is a free source-code editor built on open-source technology and developed by Microsoft for Windows, Linux and macOS. It includes support for debugging, embedded [Git](https://git-scm.com/_) and [GitHub](https://github.com/) support, syntax highlighting, intelligent code completion, code snippets, and code refactoring.

- The [`connect init` command](./../cli.md#initialize-a-new-app) generates a `.vscode/launch.json` file if you indicate you are using VS Code as your development environment.
This file is configured to allow you to run the [`connect start` command](./../cli.md#run-your-app-locally) and the [`connect test` command](./../cli.md#test-your-app) directly from VS Code. You can select `Start App` from the drop-down box in the debug
pane to run the `connect start` command or select `Run Tests`
to run the `connect test` command.

- You can set breakpoints inside your methods in VS Code to help troubleshoot issues. During iterative development, you can select `Start App` and use our Postman collection to execute your methods and view the breakpoints to troubleshoot application issues.
 When your application is complete, you can select `Run Tests` and use breakpoints to troubleshoot any test failures before [publishing](./../publish.md) your application.

- [![Atom](atom.svg)](https://atom.io/) <a href="https://atom.io" class="list-title">Atom</a><br>
Atom is a free and open-source text and source-code editor developed by GitHub for macOS, Linux, and Microsoft Windows with support for plug-ins written in [NodeJS](https://nodejs.org/) and embedded Git support. Atom is a desktop application built using web technologies.


- [![Sublime Text](sublime-text.svg)](https://www.sublimetext.com/) <a href="https://www.sublimetext.com/" class="list-title">Sublime Text</a><br>
Sublime Text is a shareware cross-platform source-code editor with a Python application programming interface.
It natively supports many programming and markup languages, and functions can be added by users via plugins which are typically community-built and maintained under free-software licenses.


- [![Postman](postman.svg)](https://www.postman.com/) <a href="https://www.postman.com/" class="list-title">Postman</a><br>
Postman is a collaboration platform for API development. You can use our Postman collection to perform [local testing](./../testing/index.md#local-testing)
of your application.
</div>


<div class="previous-next-nav">
  <a class="button button-small button-secondary" href="./../structure.md">Previous: App Structure</a>
  <a class="button button-small button-secondary" href="./../cli.md">Next: Installing the CLI</a>
</div>
