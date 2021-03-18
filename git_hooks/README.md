# Git Hooks

This directory contains scripts which are useful for local development. To enable
a hook, symlink it from this directory to `.git/hooks`. e.g.:

```
# From the project root
$ ln -s ${PWD}/git_hooks/pre-push ./.git/hooks
# From this directory
$ ln -s ${PWD}/pre-push ../.git/hooks
# Activate all hooks from project root
$ for hook in $(ls git_hooks); ln -s ${PWD}/git_hooks/${hook} ./.git/hooks/
```
