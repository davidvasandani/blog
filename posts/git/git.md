---
title: git
date: 2023-11-06T15:06:05.038Z
author: Anonymous
summary: git config
tags:
  - post
---
Configuring git for multiple personas:

```
gpg --list-secret-keys --keyid-format=long
```

```
[includeIf "gitdir:~/src/"]
  path = .gitconfig-personal
[includeIf "gitdir:~/dev/"]
  path = .gitconfig-work
```

```
git rebase --exec 'git commit --amend --no-edit --author="David Vasandani <david@vasandani.me>" -n -S' -i main
```