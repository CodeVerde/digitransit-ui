import Intersect from '@turf/intersect';
import LineString from 'turf-linestring';
import Polygon from 'turf-polygon';

const getRoadConditionObjectHits = (hitBounds, mapSelectionsData, context, hitPoint) => {
  if (!mapSelectionsData.roadConditionsState) { return []; }

  const hits = [];
  const nwCorner = context.map.layerPointToLatLng([hitBounds.min.x, hitBounds.min.y]);
  const neCorner = context.map.layerPointToLatLng([hitBounds.max.x, hitBounds.min.y]);
  const seCorner = context.map.layerPointToLatLng([hitBounds.max.x, hitBounds.max.y]);
  const swCorner = context.map.layerPointToLatLng([hitBounds.min.x, hitBounds.max.y]);
  const clickArea = Polygon([[
    [nwCorner.lat, nwCorner.lng],
    [neCorner.lat, neCorner.lng],
    [seCorner.lat, seCorner.lng],
    [swCorner.lat, swCorner.lng],
    [nwCorner.lat, nwCorner.lng],
  ]]);

  mapSelectionsData.roadConditionsData.forEach((element) => {
    const turfArray = element.geometry.map(geoElement => (
        [geoElement.lat, geoElement.lon]
    ));

    const turfLine = LineString(turfArray);

    if (Intersect(clickArea, turfLine)) {
      hits.push({
        id: element.id,
        FID: `oulu-road-condition-popup-${element.id}`,
        lat: hitPoint.lat,
        lng: hitPoint.lng,
        layer: 'oulu-road-condition',
      });
    }
  });
  return hits;
};

export default getRoadConditionObjectHits;
