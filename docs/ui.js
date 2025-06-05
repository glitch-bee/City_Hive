/**
 * UI helpers that interact with the map and user marker logic.
 */
// expects `map`, `markers`, `addingMode`, `cancelAddMode`, and `crosshair` on the window object

// Disable cluster click-to-zoom (uncluster only on zoom level)
window.markers.on('clusterclick', a => {
  a.originalEvent.preventDefault();
});

window.map.on('movestart', () => {
  if (window.addingMode) {
    window.crosshair.style.display = 'block';
  }
});

document.addEventListener('keydown', e => {
  if (window.addingMode && e.key === 'Escape') {
    window.cancelAddMode();
  }
});

const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelp = () => { if (helpModal) helpModal.style.display = 'none'; };
window.closeHelp = closeHelp;
if (helpBtn && helpModal) {
  helpBtn.addEventListener('click', () => {
    helpModal.style.display = 'flex';
  });
  helpModal.querySelector('.close-btn').addEventListener('click', closeHelp);
  helpModal.addEventListener('click', e => { if (e.target === helpModal) closeHelp(); });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    const form = document.getElementById('addTreeForm');
    if (form && form.style.display === 'block') form.style.display = 'none';
    if (helpModal && helpModal.style.display !== 'none') closeHelp();
  }
});

// Add a simple 'Locate Me' button
const locateBtn = L.control({ position: 'topleft' });
locateBtn.onAdd = map => {
  const btn = L.DomUtil.create('button', 'leaflet-bar locate-btn');
  btn.innerHTML = '📍';
  btn.title = 'Show My Location';
  btn.onclick = () => {
    map.locate({ setView: true, maxZoom: 17 });
  };
  return btn;
};
locateBtn.addTo(window.map);

// Show the marker when location is found
let myloc;
window.map.on('locationfound', e => {
  if (myloc) window.map.removeLayer(myloc);
  myloc = L.circleMarker(e.latlng, {
    radius: 10, fillColor: '#3399ff', color: '#3399ff',
    fillOpacity: 0.4, weight: 2
  }).addTo(window.map).bindPopup('You are here').openPopup();
});

window.map.on('locationerror', () => {
  alert('Unable to access your location.');
});
