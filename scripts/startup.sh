#!/bin/sh
# Start the cron service in the background
cron -f &

# Run the server in the foreground
yarn run start
