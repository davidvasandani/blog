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
    127.0.0.1   blog.castle
    ```
1. open [https://mastodon.castle](mastodon.castle) and login.  
username: `user@bitnami.org`  
password: `bitnami1`

1. Add the following to `./volumes/proxy/traefik_dynamic.toml` to make the 11ty blog available via https:
    ```
    # add blog.castle to the list of SANs for the ACME certificate
    # this is needed because the blog is hosted on a different server
    # than the rest of the services
    [http.routers]
      [http.routers.blog]
        rule = "Host(`blog.castle`)"
        service = "blog"
        entryPoints = ["websecure"]
        [http.routers.blog.tls]
          certResolver = "smallstep"
          [[http.routers.blog.tls.domains]]
            main = "blog.castle"
            sans = ["blog.castle"]

    # blog.castle service is running on the host computer but traefik
    # is running in a container to access the host use host.docker.internal
    [http.services]
      [http.services.blog.loadBalancer]
        [[http.services.blog.loadBalancer.servers]]
          url = "http://host.docker.internal:8080"
    ```

### Test `eleventy-plugin-activity-pub`

1. Run 11ty locally
    ```
    npm start
    ```
1. Load the blog at [https://blog.castle](https://blog.castle)
1. 