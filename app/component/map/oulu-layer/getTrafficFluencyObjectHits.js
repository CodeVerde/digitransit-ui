import L from 'leaflet';
import polyline from 'polyline-encoded';
// import turf from '@turf/turf';
// const turf = require('@turf/turf');

const getTrafficFluencyObjectHits = (hitBounds, mapSelectionsData, context, hitPoint) => {
  if (!mapSelectionsData.trafficFluencyState) { return []; }

  const hits = [];

  // console.log('hitPoint: ', hitPoint);
  // const poly1 = turf.polygon([[
  //   [hitPoint.lat + 0.111, hitPoint.lng + 0.111],
  //   [hitPoint.lat + 0.111, hitPoint.lng - 0.111],
  //   [hitPoint.lat - 0.111, hitPoint.lng - 0.111],
  //   [hitPoint.lat - 0.111, hitPoint.lng + 0.111],
  //   [hitPoint.lat + 0.111, hitPoint.lng + 0.111],
  // ]]);

  mapSelectionsData.trafficFluencyData.forEach((element) => {
    const polyDeco = polyline.decode(element.encodedGeometry);

    // const poly3 = turf.multiLineString(polyDeco);
    // const intersection = turf.intersect(poly1, poly3);
    // console.log('poly3: ', poly3);
    // if (intersection) {
    //   console.log('intersection: ', intersection);
    // }
    // console.log('intersection: ', intersection);

    if (L.polyline(polyDeco).getBounds().contains(hitPoint)) {
      console.log('contains!');
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
    }
  });
  return hits;
};

export default getTrafficFluencyObjectHits;
