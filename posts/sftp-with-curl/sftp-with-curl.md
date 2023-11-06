---
title: SFTP with Curl
date: 2023-11-06T22:00:28.404Z
author: David Vasandani
summary: TIL it's possible to upload and download files to SFTP (and lots of
  other protocols) with curl.
tags:
  - post
---
This [HN comment](https://news.ycombinator.com/item?id=9447636) enlightened me.

\---

To download a file:

```
curl -u david:$(op item get flounder --fields label=password) \
  -O sftp://flounder.online:2024/index.gmi
```

To upload a file:

```
curl -u david:$(op item get flounder --fields label=password) \
  sftp://flounder.online:2024 --upload-file index.gmi
```