---
title: Disable RAID on Ubiquiti NVR
date: 2024-12-08T04:49:00.000Z
author: David Vasandani
summary: Disable RAID on an UNVR using mdadm
tags:
  - post
---
I wanted to use my UNVR as a fileserver running MooseFS and it's recommended to disable RAID.

```
# unmount the volume
$ umount /volume1

# stop the array
mdadm --stop /dev/md3

# zero the data
mdadm --zero-superblock /dev/sda5 /dev/sdb5 /dev/sdc5 /dev/sdd5

# create a new linear array
mdadm --create /dev/md3 --level=linear --raid-devices=4 /dev/sda5 /dev/sdb5 /dev/sdc5 /dev/sdd5

# check the array
mdadm --detail /dev/md3
/dev/md3:
           Version : 1.2
     Creation Time : Sun Dec  8 04:15:53 2024
        Raid Level : linear
        Array Size : 78093217726 (74475.50 GiB 79967.45 GB)
      Raid Devices : 4
     Total Devices : 4
       Persistence : Superblock is persistent

       Update Time : Sun Dec  8 04:15:53 2024
             State : clean 
    Active Devices : 4
   Working Devices : 4
    Failed Devices : 0
     Spare Devices : 0

          Rounding : 0K

Consistency Policy : none

              Name : UNVR2:3  (local to host UNVR2)
              UUID : c5cefdb3:ceb85edf:552fab96:a5caccd1
            Events : 0

    Number   Major   Minor   RaidDevice State
       0       8        5        0      active sync   /dev/sda5
       1       8       21        1      active sync   /dev/sdb5
       2       8       37        2      active sync   /dev/sdc5
       3       8       53        3      active sync   /dev/sdd5

# format and mount the new array
mkfs.ext4 /dev/md3
mount /dev/md3 /volume1
```
