import L from 'leaflet';
// import polyline from 'polyline-encoded';
// import turf from '@turf/turf';
// const turf = require('@turf/turf');

const getRoadConditionObjectHits = (hitBounds, mapSelectionsData, context, hitPoint) => {
  if (!mapSelectionsData.roadConditionsState) { return []; }

  const hits = [];

  // console.log('hitPoint: ', hitPoint);
  // const poly1 = turf.polygon([[
  //   [hitPoint.lat + 0.111, hitPoint.lng + 0.111],
  //   [hitPoint.lat + 0.111, hitPoint.lng - 0.111],
  //   [hitPoint.lat - 0.111, hitPoint.lng - 0.111],
  //   [hitPoint.lat - 0.111, hitPoint.lng + 0.111],
  //   [hitPoint.lat + 0.111, hitPoint.lng + 0.111],
  // ]]);

  mapSelectionsData.roadConditionsData.forEach((element) => {
    // console.log('element: ', element);
    // const polyDeco = polyline.decode(element.encodedGeometry);

    // const poly3 = turf.multiLineString(polyDeco);
    // const intersection = turf.intersect(poly1, poly3);
    // console.log('poly3: ', poly3);
    // if (intersection) {
    //   console.log('intersection: ', intersection);
    // }
    // console.log('intersection: ', intersection);
    const myLine = L.polyline(element.geometry);
    console.log('myLine: ', myLine);
    console.log('myLine.getBounds(): ', myLine.getBounds());

    if (myLine.getBounds().contains(hitPoint)) {
      console.log('getRoadConditionObjectHits contains!');
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
