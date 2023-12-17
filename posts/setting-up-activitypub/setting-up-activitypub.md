---
title: Setting up ActivityPub
date: 2023-12-17T02:01:07.640Z
author: David Vasandani
summary: Setup ActivityPub for 11ty with local testing
tags:
  - post
---
<!-- TODO: Add Intro -->

### Local Testing with Sandcastle
<!-- TODO: use retoot to screenshot this post:
https://hachyderm.io/@jenniferplusplus/111406825202624566 -->
1. run the following commands
    ```bash
    git clone https://github.com/Letterbook/Sandcastles.git
    cd Sandcastles
    docker compose up root-ca -d
    docker compose -f docker-compose.yml -f mastodon.castle.yml up -d
    brew install step
    ./trust.bash
    ```
1. restart open browsers
1. add the following to /etc/hosts
    ```plaintext
    # https://github.com/Letterbook/Sandcastles
    127.0.0.1   root-ca.castle
    127.0.0.1   dashboard.castle
    127.0.0.1   host.castle
    127.0.0.1   mastodon.castle
    127.0.0.1   letterbook.castle
    ```
1. open [https://mastodon.castle](mastodon.castle) and login.  
username: `user@bitnami.org`  
password: `bitnami1`