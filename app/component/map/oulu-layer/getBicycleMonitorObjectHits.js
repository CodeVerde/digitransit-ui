import L from 'leaflet';

const getBicycleMonitorObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showBicycleMonitors) { return []; }

  const hits = [];
  mapSelectionsData.bicycleMonitorsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-bicycle-monitor-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-bicycle-monitor',
      });
    }
  });
  return hits;
};

export default getBicycleMonitorObjectHits;
