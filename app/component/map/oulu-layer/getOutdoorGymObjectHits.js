import L from 'leaflet';

const getOutdoorGymObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showOutdoorGyms) { return []; }

  const hits = [];
  mapSelectionsData.outdoorGymsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry[0],
        element.geometry[1],
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-outdoor-gym-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-outdoor-gym',
        content: {
          id: element.id,
          name: element.name,
          geometry: element.geometry,
          infoLink: element.infoLink,
          description: element.description,
          startDate: element.startDate,
          endDate: element.endDate,
        },
      });
    }
  });
  return hits;
};

export default getOutdoorGymObjectHits;
