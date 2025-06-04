const CH = window.CityHive = window.CityHive || {};

// Disable cluster click-to-zoom (uncluster only on zoom level)
CH.markers.on('clusterclick', a => {
  a.originalEvent.preventDefault();
});

CH.map.on('movestart', () => {
  if (CH.addingMode) {
    crosshair.style.display = 'block';
  }
});

document.addEventListener('keydown', e => {
  if (CH.addingMode && e.key === 'Escape') {
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
  const btn = L.DomUtil.create('button', 'leaflet-bar');
  btn.innerHTML = '📍';
  btn.title = 'Show My Location';
  btn.style.background = '#fff';
  btn.style.padding = '6px 10px';
  btn.style.fontSize = '18px';
  btn.onclick = () => {
    map.locate({ setView: true, maxZoom: 17 });
  };
  return btn;
};
locateBtn.addTo(CH.map);

// Show the marker when location is found
CH.map.on('locationfound', e => {
  if (CH._myloc) CH.map.removeLayer(CH._myloc);
  CH._myloc = L.circleMarker(e.latlng, {
    radius: 10, fillColor: '#3399ff', color: '#3399ff',
    fillOpacity: 0.4, weight: 2
  }).addTo(CH.map).bindPopup('You are here').openPopup();
});

CH.map.on('locationerror', () => {
  alert('Unable to access your location.');
});
