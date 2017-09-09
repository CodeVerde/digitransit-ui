import L from 'leaflet';

const getIncidentObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showIncidents) { return []; }

  const hits = [];
  mapSelectionsData.incidentsData.forEach((element) => {
    const elementPoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(elementPoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-incident-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-incident',
      });
    }

    if (element.geometry2) {
      const element2Point = context.map.latLngToLayerPoint(
        L.latLng([
          element.geometry2.lat,
          element.geometry2.lon,
        ]));

      if (hitBounds.contains(element2Point)) {
        hits.push({
          id: element.id,
          FID: `oulu-incident2-popup-${element.id}`,
          lat: element.geometry2.lat,
          lng: element.geometry2.lon,
          layer: 'oulu-incident',
        });
      }
    }
  });
  return hits;
};

export default getIncidentObjectHits;
