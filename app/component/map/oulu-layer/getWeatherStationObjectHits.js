import L from 'leaflet';

const getWeatherStationObjectHits = (hitBounds, mapSelectionsData, context) => {
  if (!mapSelectionsData.showWeatherStations) { return []; }

  const hits = [];
  mapSelectionsData.weatherStationsData.forEach((element) => {
    const mousePoint = context.map.latLngToLayerPoint(
      L.latLng([
        element.geometry.lat,
        element.geometry.lon,
      ]));

    if (hitBounds.contains(mousePoint)) {
      hits.push({
        id: element.id,
        FID: `oulu-weather-station-popup-${element.id}`,
        lat: element.geometry.lat,
        lng: element.geometry.lon,
        layer: 'oulu-weather-station',
      });
    }
  });
  return hits;
};

export default getWeatherStationObjectHits;
