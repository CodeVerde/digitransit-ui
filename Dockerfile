FROM node:6
MAINTAINER Reittiopas version: 0.1

EXPOSE 8080

ENV \
  # Where the app is built and run inside the docker fs \
  WORK=/opt/digitransit-ui \
  # Used indirectly for saving npm logs etc. \
  HOME=/opt/digitransit-ui \
  # App specific settings to override when the image is run \
  SENTRY_DSN='' \
  SENTRY_SECRET_DSN='' \
  PORT=8080 \
  API_URL='' \
  MAP_URL='' \
  APP_PATH='' \
  CONFIG='' \
  PIWIK_ADDRESS='' \
  PIWIK_ID='' \
  NODE_ENV='' \
  NODE_OPTS='' \
  RELAY_FETCH_TIMEOUT=''

WORKDIR ${WORK}
ADD . ${WORK}

RUN wget http://www.yr.no/place/Finland/Oulu/Oulu/forecast.xml -O ${WORK}/static/xml/forecast.xml

RUN \
  apt-get update && \
  apt-get -y install cron

# Add crontab file in the cron directory
ADD forecast-cron /etc/cron.d/forecast-cron

# Give execution rights on the cron job
RUN chmod 0644 /etc/cron.d/forecast-cron

# Give execution rights on the cron job
RUN chmod +x /etc/cron.d/forecast-cron

# Create the log file to be able to run tail
RUN touch /var/log/cron.log

# Give execution rights on the cron job
RUN chmod +x scripts/startup.sh

RUN \
  yarn install --silent && \
  yarn add --force node-sass && \
  yarn run build && \
  rm -rf static docs test /tmp/* && \
  yarn cache clean

# Run the command on container startup
# CMD cron && tail -f /var/log/cron.log

# CMD yarn run start

CMD ["scripts/startup.sh"]
