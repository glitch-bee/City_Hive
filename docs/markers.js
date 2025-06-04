// eslint-disable-next-line no-unused-vars
var CH = window.CityHive;

/**
 * Returns a color for the given tree species.
 * @param {string} species
 * @returns {string}
 */
const getColor = species => {
  switch ((species || '').toLowerCase()) {
    case 'norway maple': return '#ff6600';
    case 'sweetgum': return '#ffcc00';
    case 'callery pear': return '#00ccff';
    case 'honeylocust': return '#00ff99';
    case 'red maple': return '#ff33cc';
    case 'london planetree': return '#8b5c2a';
    case 'pin oak': return '#1e90ff';
    case 'red oak': return '#b22222';
    case 'silver maple': return '#cccccc';
    case 'black locust': return '#004d00';
    case 'american elm': return '#009966';
    default: return '#ff3366';
  }
};

// Marker cluster group (with cluster-click disabled)
CH.markers = L.markerClusterGroup({
  zoomToBoundsOnClick: false,
  spiderfyOnMaxZoom: true
});
// Legacy exposure
window.markers = CH.markers;

// Load GeoJSON (filtered citywide trees) with cache-busting query param
fetch(`full_boro_filtered.geojson?v=${Date.now()}`)
  .then(res => res.json())
  .then(data => {
    L.geoJSON(data, {
      pointToLayer: (feature, latlng) => L.circleMarker(latlng, {
        radius: 5,
        fillColor: getColor(feature.properties.spc_common),
        color: getColor(feature.properties.spc_common),
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
      }),
      onEachFeature: (feature, layer) => {
        const p = feature.properties;
        layer.bindPopup(
          `ID: ${p.tree_id}<br>Species: ${p.spc_common}<br>DBH: ${p.tree_dbh}`
        );
      }
    }).eachLayer(layer => CH.markers.addLayer(layer));
    CH.map.addLayer(CH.markers);
  });
