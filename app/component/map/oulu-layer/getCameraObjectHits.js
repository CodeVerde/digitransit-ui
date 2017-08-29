import L from 'leaflet';

const getCameraObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showCameras) { return []; }

  const hits = [];
  mapSelectionsData.camerasData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-camera-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-camera',
      });
    }
  });
  return hits;
};

export default getCameraObjectHits;
