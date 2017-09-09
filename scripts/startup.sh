#!/bin/sh
# Start the cron service in the background
cron start

crontab /etc/cron.d/forecast-cron

# Run the server in the foreground
yarn run start
