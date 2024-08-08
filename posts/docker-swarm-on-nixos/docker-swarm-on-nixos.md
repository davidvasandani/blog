---
title: Docker Swarm on NixOS
date: 2024-08-08T01:01:00.000Z
author: David Vasandani
summary: Docker Swarm on NixOS
tags:
  - post
---
1. Update `flake.nix` to `nixos-24.05` where Docker Engine 2.7 is available
```
  inputs = {
    # NixOS official package source, using the nixos-24.05 branch here
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };
```

2. Update `configuration.nix` to open the Docker ports
```
# open ports in firewall
  # Open ports in the firewall.
  networking.firewall.allowedTCPPorts = [
    22
    53
    2377
    7946
    3000
  ];
  networking.firewall.allowedUDPPorts = [
    7946
    4789
  ];
```

3. Update `configuration.nix` to install and start Docker Engine 2.7
```
  virtualisation.docker = {
    enable = true;
    package = pkgs.docker_27;
    daemon.settings = {
      live-restore = false;
    };
  }
```

4. Rebuild
```
nixos-rebuild switch
```

5. Initialize the Swarm
```
docker swarm init --advertise-addr ###.###.###.###
```
