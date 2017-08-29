import L from 'leaflet';

const getCarParkObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showCarParks) { return []; }

  const hits = [];
  mapSelectionsData.carParksData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-car-park-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-car-park',
      });
    }
  });
  return hits;
};

export default getCarParkObjectHits;
