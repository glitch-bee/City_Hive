export function setupUI(map) {
  const helpBtn = document.getElementById('helpBtn');
  const helpModal = document.getElementById('helpModal');
  const closeHelp = () => { if (helpModal) helpModal.style.display = 'none'; };
  if (helpBtn && helpModal) {
    helpBtn.addEventListener('click', () => { helpModal.style.display = 'flex'; });
    helpModal.querySelector('.close-btn').addEventListener('click', closeHelp);
    helpModal.addEventListener('click', e => { if (e.target === helpModal) closeHelp(); });
  }

  const locateBtn = L.control({ position: 'topleft' });
  locateBtn.onAdd = m => {
    const btn = L.DomUtil.create('button', 'leaflet-bar locate-btn');
    btn.innerHTML = '📍';
    btn.title = 'Show My Location';
    btn.onclick = () => {
      m.locate({ setView: true, maxZoom: 17 });
    };
    return btn;
  };
  locateBtn.addTo(map);

  let myloc;
  map.on('locationfound', e => {
    if (myloc) map.removeLayer(myloc);
    myloc = L.circleMarker(e.latlng, {
      radius: 10, fillColor: '#3399ff', color: '#3399ff',
      fillOpacity: 0.4, weight: 2
    }).addTo(map).bindPopup('You are here').openPopup();
  });

  map.on('locationerror', () => { alert('Unable to access your location.'); });
}
