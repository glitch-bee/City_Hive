/**
 * Application namespace used to avoid polluting the global scope.
 * Other scripts attach their exports to this object.
 */
var CH = window.CityHive = window.CityHive || {};

/**
 * Initialize the Leaflet map and muted basemap layer.
 */
CH.map = L.map('map').setView([40.75, -73.95], 11);
// Expose for compatibility with legacy code
window.map = CH.map;

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors'
}).addTo(CH.map);
