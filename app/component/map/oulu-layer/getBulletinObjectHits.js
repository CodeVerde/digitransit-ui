import L from 'leaflet';

const getBulletinObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showBulletins) { return []; }

  const hits = [];
  mapSelectionsData.bulletinsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-bulletin-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-bulletin',
      });
    }
  });
  return hits;
};

export default getBulletinObjectHits;
