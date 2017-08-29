import L from 'leaflet';

const getWalkMonitorObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showWalkMonitors) { return []; }

  const hits = [];
  mapSelectionsData.walkMonitorsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-walk-monitor-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-walk-monitor',
      });
    }
  });
  return hits;
};

export default getWalkMonitorObjectHits;
