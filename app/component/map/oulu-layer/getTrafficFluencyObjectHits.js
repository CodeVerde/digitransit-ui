import Polyline from 'polyline-encoded';
import Intersect from '@turf/intersect';
import LineString from 'turf-linestring';
import Polygon from 'turf-polygon';

const getTrafficFluencyObjectHits = (hitBounds, mapSelectionsData, context, hitPoint) => {
  if (!mapSelectionsData.trafficFluencyState) { return []; }

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

  mapSelectionsData.trafficFluencyData.every((element) => {
    const decodedGeo = Polyline.decode(element.encodedGeometry);
    const turfLine = LineString(decodedGeo);
    if (Intersect(clickArea, turfLine)) {
      hits.push({
        id: element.id,
        FID: `oulu-traffic-fluency-popup-${element.id}`,
        lat: hitPoint.lat,
        lng: hitPoint.lng,
        layer: 'oulu-traffic-fluency',
        content: {
          id: element.id,
          name: element.name,
          description: element.description,
          timestamp: element.timestamp,
          fluencyText: element.fluencyText,
        },
      });
      return false;
    }
    return true;
  });
  return hits;
};

export default getTrafficFluencyObjectHits;
