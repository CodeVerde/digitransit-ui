import L from 'leaflet';

const getCarMonitorObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showCarMonitors) { return []; }

  const hits = [];
  mapSelectionsData.carMonitorsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-car-monitor-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-car-monitor',
      });
    }
  });
  return hits;
};

export default getCarMonitorObjectHits;
