---
title: git config and signing commits
date: 2023-12-17T00:42:04.785Z
author: Anonymous
summary: Configure git to sign commits with multiple personas
tags:
  - post
  - git
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

````
➜ dev cat ~/.gitconfig
...
[includeIf "gitdir:~/src/"]
  path = /Users/davidvasandani/.config/git/.gitconfig-personal
[includeIf "gitdir:~/dev/"]
  path = /Users/davidvasandani/.config/git/.gitconfig-work```
...

------------------------------------------------------------
➜ dev cat /Users/davidvasandani/.config/git/.gitconfig-personal
[user]
name = David Vasandani
	email = david@vasandani.me
	signingkey = 32F2F19BDBA28E38

[commit]
	gpgsign = true

------------------------------------------------------------
➜ dev cat /Users/davidvasandani/.config/git/.gitconfig-work
[user]
name = David Vasandani
	email = david.vasandani@sweetgreen.com
	signingkey = 31AF7204918814FF

[commit]
	gpgsign = true
````

### amend a group of commits to sign them

```
git rebase --exec 'git commit --amend --no-edit --author="David Vasandani <david@vasandani.me>" -n -S' -i main
```

## Next Steps

Improve the experience with 1Password.\
<https://blog.1password.com/git-commit-signing/>