---
title: DIY Rsync over AWS SSM Session Manager
date: 2023-12-07T04:27:10.361Z
author: David Vasandani
summary: Without SSH access to an ECS task running on Fargate, we used SSM
  Session Manager to sync files from our local env to ECS via S3.
tags:
  - post
---
Without SSH access to an ECS task running on Fargate, we used SSM Session Manager to sync files from our local env to ECS via S3.

Running this script starts two background jobs. `sync_to_s3` runs locally and syncs all the files from `$DIRECTORY_TO_WATCH` to S3. `sync_to_ecs` runs remotely on an ECS task (previously started), installs v1 of the AWS CLI (which is enough to work with S3), and starts a loop that syncs from S3 to a local path in the remote container.

This does not sync file modes (chmod) as files modes are not synced by the AWS CLI.

```
#!/bin/bash

# Variables
DIRECTORY_TO_WATCH="${HOME}/dev/source_directory"
S3_BUCKET="s3://private_s3_bucket/source_directory"
CLUSTER="fargate-cluster-name"
TASK_ID="ecs-task-id"
CONTAINER="app"
DIRECTORY_IN_CONTAINER="/app"

# Function to sync local directory to S3
sync_to_s3() {
  fswatch -o "$DIRECTORY_TO_WATCH" | while read -r; do
    echo "DIRECTORY_TO_WATCH: $DIRECTORY_TO_WATCH"
    echo "S3_BUCKET: $S3_BUCKET"
    echo "Syncing from $DIRECTORY_TO_WATCH to $S3_BUCKET"
    aws s3 sync "$DIRECTORY_TO_WATCH" "$S3_BUCKET" || exit 1
  done
}

# Function to sync S3 to ECS container
sync_to_ecs() {
  aws ecs execute-command \
    --cluster "${CLUSTER}" \
    --task "${TASK_ID}" \
    --container "${CONTAINER}" \
    --command "/bin/sh -c 'apk add aws-cli; while true; do aws s3 sync ${S3_BUCKET} ${DIRECTORY_IN_CONTAINER} || exit 1; sleep 5; done'" \
    --interactive || exit 1
}

main() {
  trap 'kill $(jobs -p)' EXIT
  sync_to_s3 &
  sync_to_ecs &
  wait
}

main "$@"
```