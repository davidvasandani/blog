---
title: Netlify, Prisma, and CockroachDB
date: 2023-12-24T02:54:01.671Z
author: David Vasandani
summary: Getting started with Netlify, Prisma, and CockroachDB
tags:
  - post
---
Instead of rehashing an existing how-to guide for how to setup Netlify, Prisma, and CockroachDB, I'm going to point to this [one](https://github.com/cockroachdb/cockroachdb-typescript).

After creating the CockroachDB cluster and adding the `DATABASE_URL` to the `.env`, these are the commands I used to get up and running:
```
# create the database schema
npx prisma migrate dev --name init

# seed the DB with data
npx prisma db seed

# start the Netlify frontend and functions
netlify dev
```