---
title: Docker Swarm on NixOS
date: 2024-08-08T01:01:00.000Z
author: David Vasandani
summary: Docker Swarm on NixOS
tags:
  - post
---
### Install Docker

1. Update `flake.nix` to `nixos-24.05` where Docker Engine 2.7 is available
```
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.05";
  };
```

2. Update `configuration.nix` to open the Docker ports
```
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
    rootless = {
      enable = true;
      setSocketVariable = true;
    };
    package = pkgs.docker_27;
    daemon.settings = {
      live-restore = false;
    };
  };
```

4. Rebuild
```
nixos-rebuild switch
```

5. Initialize the Swarm
```
docker swarm init --advertise-addr ###.###.###.###
```

---

### Expose the Docker API via TCP

1. Add `listenOptions`. Only tcp should be set because `/run/docker.sock` is already exposed via `rootless.setSocketVariable`

```
  virtualisation.docker = {
    enable = true;
    listenOptions = [ "0.0.0.0:2375" ];
    rootless = {
      enable = true;
      setSocketVariable = true;
    };
    package = pkgs.docker_27;
    daemon.settings = {
      live-restore = false;
    };
  };
```

2. Add new listener port to `networking.firewall.allowedTCPPorts`
```
  networking.firewall.allowedTCPPorts = [
    22
    53
    2377
    7946
    3000
  ];
```

3. Rebuild
```
nixos-rebuild switch
```

4. Restart Docker Socket
```
systemctl restart docker.socket
```

5. Add the remote Docker context
```
docker context create remote --docker "host=tcp://###.###.###.###:2375"
```

6. Use the new context for a one-off command or switch to it 
```
docker --context remote ps
docker context use remote
```

---

### Join a worker to the Swarm and scale a service

1. Join the Swarm from the worker device 
```
docker swarm join --token XXX ###.###.###.###:2377
```

2. Create a Swarm Service
```
docker service create --replicas 1 --name helloworld alpine ping docker.com
```

3. Inspect
```
docker service inspect --pretty helloworld
```

4. Scale the service. 
```
docker service scale helloworld=5
```

5. List the tasks
```
docker service ps helloworld
```
