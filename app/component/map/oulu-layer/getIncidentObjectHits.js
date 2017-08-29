import L from 'leaflet';

const getIncidentObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showIncidents) { return []; }

  const hits = [];
  mapSelectionsData.incidentsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-incident-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-incident',
      });
    }
  });
  return hits;
};

export default getIncidentObjectHits;
