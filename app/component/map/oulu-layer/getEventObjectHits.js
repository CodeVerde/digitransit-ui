import L from 'leaflet';

const getEventObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showEvents) { return []; }

  const hits = [];
  mapSelectionsData.eventsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry[0],
        element.geometry[1],
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-event-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-event',
        content: {
          venueName: element.venueName,
          geometry: element.geometry,
          infoLink: element.infoLink,
          extraInfo: element.extraInfo,
          id: element.id,
          name: element.name,
          description: element.description,
          startDate: element.startDate,
          endDate: element.endDate,
          startTime: element.startTime,
          endTime: element.endTime,
          tags: element.tags,
        },
      });
    }
  });
  return hits;
};

export default getEventObjectHits;
