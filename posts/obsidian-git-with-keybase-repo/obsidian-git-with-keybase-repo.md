---
title: Obsidian Git with Keybase Repo
date: 2023-11-27T20:40:07.885Z
author: Anonymous
summary: Using the obsidian-git plugin with a Keybase repo
tags:
  - post
---
```
$ which git-remote-keybase
/usr/local/bin/git-remote-keybase

$ git --exec-path
/opt/homebrew/Cellar/git/2.41.0_2/libexec/git-core

$ ln -s /usr/local/bin/git-remote-keybase /opt/homebrew/Cellar/git/2.41.0_2/libexec/git-core/
```