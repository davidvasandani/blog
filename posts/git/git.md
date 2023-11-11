---
title: git
date: 2023-11-06T15:06:05.038Z
author: Anonymous
summary: git config
tags:
  - post
---
Configuring git for multiple personas:

### generate new key

```
gpg --full-generate-key

gpg (GnuPG) 2.4.3; Copyright (C) 2023 g10 Code GmbH
Please select what kind of key you want:
Please select which elliptic curve you want:
Please specify how long the key should be valid.
Is this correct? (y/N)

GnuPG needs to construct a user ID to identify your key.
Real name: David Vasandani
Email address: david@vasandani.me
Comment:
You selected this USER-ID:
    "David Vasandani <david@vasandani.me>"

Change (N)ame, (C)omment, (E)mail or (O)kay/(Q)uit? O
```

### export your public key

list existing keys and copy the ID; it’s preceded by: `sec   ed25519/` and export the public key to your clipboard.

```
gpg --list-secret-keys --keyid-format=long

sec   ed25519/31AF7204918814FF 2023-11-08 [SC]

gpg --armor --export 31AF7204918814FF > pbcopy
```

Add the key to your [GitHub profile](https://github.com/settings/keys).

### configure your git client

```
[includeIf "gitdir:~/src/"]
  path = .gitconfig-personal
[includeIf "gitdir:~/dev/"]
  path = .gitconfig-work
```

### amend a group of commits to sign them

```
git rebase --exec 'git commit --amend --no-edit --author="David Vasandani <david@vasandani.me>" -n -S' -i main
```

## Improvement with 1Password
https://blog.1password.com/git-commit-signing/
