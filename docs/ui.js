/**
 * UI helpers that interact with the map and user marker logic.
 */
// expects `map`, `markers`, `addingMode`, `cancelAddMode`, and `crosshair` on the window object

// Disable cluster click-to-zoom (uncluster only on zoom level)
markers.on('clusterclick', a => {
  a.originalEvent.preventDefault();
});

map.on('movestart', () => {
  if (addingMode) {
    crosshair.style.display = 'block';
  }
});

document.addEventListener('keydown', e => {
  if (addingMode && e.key === 'Escape') {
    cancelAddMode();
  }
});

const helpBtn = document.getElementById('helpBtn');
const helpModal = document.getElementById('helpModal');
const closeHelp = () => { if (helpModal) helpModal.style.display = 'none'; };
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
locateBtn.addTo(map);

// Show the marker when location is found
let myloc;
map.on('locationfound', e => {
  if (myloc) map.removeLayer(myloc);
  myloc = L.circleMarker(e.latlng, {
    radius: 10, fillColor: '#3399ff', color: '#3399ff',
    fillOpacity: 0.4, weight: 2
  }).addTo(map).bindPopup('You are here').openPopup();
});

map.on('locationerror', () => {
  alert('Unable to access your location.');
});
