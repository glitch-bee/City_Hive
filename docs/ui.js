export function setupUI(map, markers) {
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

  const legend = document.getElementById('legend');
  const legendToggleBtn = document.getElementById('legendToggleBtn');
  let legendVisible = true;
  if (legend && legendToggleBtn) {
    legendToggleBtn.addEventListener('click', () => {
      legendVisible = !legendVisible;
      legend.style.display = legendVisible ? 'block' : 'none';
      legendToggleBtn.style.background = legendVisible
        ? 'linear-gradient(90deg,#00b894 60%,#6e44ff 100%)'
        : 'linear-gradient(90deg,#6e44ff 60%,#00b894 100%)';
    });
    document.addEventListener('click', e => {
      if (legendVisible && !legend.contains(e.target) && !legendToggleBtn.contains(e.target)) {
        legend.style.display = 'none';
        legendVisible = false;
        legendToggleBtn.style.background = 'linear-gradient(90deg,#6e44ff 60%,#00b894 100%)';
      }
    });
    if (window.innerWidth <= 700) {
      legendVisible = false;
      legend.style.display = 'none';
    }
  }

  const treeToggleBtn = document.getElementById('treeToggleBtn');
  let treesVisible = true;
  if (treeToggleBtn && markers) {
    treeToggleBtn.onclick = () => {
      treesVisible = !treesVisible;
      if (treesVisible) {
        map.addLayer(markers);
        treeToggleBtn.style.background = 'linear-gradient(90deg,#00b894 60%,#6e44ff 100%)';
      } else {
        map.removeLayer(markers);
        treeToggleBtn.style.background = 'linear-gradient(90deg,#bbb 60%,#ccc 100%)';
      }
    };
  }

  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      document.body.classList.toggle('menu-open');
    });
  }

  const filterToggleBtn = document.getElementById('filterToggleBtn');
  const typeFilters = document.getElementById('typeFilters');
  let filtersVisible = false;
  if (filterToggleBtn && typeFilters) {
    filterToggleBtn.addEventListener('click', () => {
      filtersVisible = !filtersVisible;
      typeFilters.style.display = filtersVisible ? 'block' : 'none';
    });
  }
}
