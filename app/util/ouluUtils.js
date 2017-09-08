import React from 'react';

export function cleanJson(data) {
  if (!data || data.length === 0) { return ''; }

  const strStart = '":{"';
  const strEnd = ']}';
  const data2 = JSON.stringify(data).replace(/\\"/g, '"').replace(/":"\{"/g, strStart).replace(/\]\}"/g, strEnd);
  return JSON.parse(data2);
}

export function parseBreaks(text) {
  if (!text) { return ''; }

  const br = React.createElement('br');
  const regex = /(<br \/>)/g;
  const noBreaksText = text.replace(/(\r\n|\n|\r)/gm, '');
  return noBreaksText.split(regex).map((line, index) => (
    // eslint-disable-next-line react/no-array-index-key
     line.match(regex) ? <br key={`parse-break-key_${index}`} /> : line
  ));
}

export const getEventIconName = (tags) => {
  if (tags.indexOf('children') >= 0) {
    return 'event-icon-childrens-event';
  } else if (tags.indexOf('music') >= 0) {
    return 'event-icon-concert';
  } else if (tags.indexOf('museum') >= 0) {
    return 'event-icon-museum';
  } else if (tags.indexOf('sport') >= 0) {
    return 'event-icon-sport-event';
  } else if (tags.indexOf('theatre') >= 0) {
    return 'event-icon-theatre';
  } else if (tags.indexOf('festival') >= 0) {
    return 'event-icon-festival';
  }
  return 'events-icon';
};
