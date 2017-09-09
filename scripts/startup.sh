#!/bin/sh
# Start the cron service in the background
cron start

# Run the server in the foreground
yarn run start
