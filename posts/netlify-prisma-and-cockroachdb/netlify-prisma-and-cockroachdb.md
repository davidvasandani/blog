---
title: Netlify, Prisma, and CockroachDB
date: 2023-12-24T02:54:01.671Z
author: David Vasandani
summary: Getting started with Netlify, Prisma, and CockroachDB
tags:
  - post
---
Instead of rehashing an existing how-to guide, I'm going to point to this one if you want to get a boiler plate  



```

npx prisma migrate dev --name init
npx prisma db seed
netlify dev
```