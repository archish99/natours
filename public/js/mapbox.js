/* eslint-disable */
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYXJjaGlzaDk5IiwiYSI6ImNrYndjbHF4YjBlcG4yem5xeWZtc3l4ZGwifQ.U-tO277gMlcc2f7dy9f7mg';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/archish99/ckbwcqb4k0zvw1ioce0ildwsl/draft',
    scrollZoom: false,
    //   center: [-118.113491, 34.111745],
    //   zoom: 4,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create a marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add the marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom', // Location of the pin that will be on the location i.e. bottom of the pin
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add the popup (name)
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend the map bounds to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
