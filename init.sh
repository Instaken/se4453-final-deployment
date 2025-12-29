#!/bin/bash

echo "${SSH_PASSWD:-root:Docker!}" | chpasswd

service ssh start
cd /code
node index.js