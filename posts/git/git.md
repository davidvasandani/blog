---
title: git
date: 2023-11-06T15:06:05.038Z
author: Anonymous
summary: git config
tags:
  - post
---
Configuring git for multiple personas:

generate new key

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

list existing keys and find the shortcode of the new key

```
gpg --list-secret-keys --keyid-format=long

sec   ed25519/31AF7204918814FF 2023-11-08 [SC]
      68D53E8B77B7A66EA693565931AF7204918814FF
uid                 [ultimate] David Vasandani <david.vasandani@sweetgreen.com>
ssb   cv25519/14CD5BDDF3388068 2023-11-08 [E]
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