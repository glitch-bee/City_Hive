/**
 * Export the initialized Leaflet map used by other modules.
 */
export const map = L.map('map').setView([40.75, -73.95], 11);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors'
}).addTo(map);
