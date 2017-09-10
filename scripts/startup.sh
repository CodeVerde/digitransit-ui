#!/bin/sh
# Start the cron service in the background
cron start

# Manually adding new job for the cron to run
crontab /etc/cron.d/forecast-cron

# Run the server in the foreground
yarn run start
