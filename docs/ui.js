<script>
    // Disable cluster click-to-zoom (uncluster only on zoom level)
    markers.on('clusterclick', function (a) {
      a.originalEvent.preventDefault();
    });

    map.on('movestart', function() {
      if (addingMode) {
        crosshair.style.display = 'block';
      }
    });

    document.addEventListener('keydown', function(e) {
      if (addingMode && e.key === "Escape") {
        cancelAddMode();
      }
    });

    // Add a simple 'Locate Me' button
    var locateBtn = L.control({position: 'topleft'});
    locateBtn.onAdd = function(map) {
      var btn = L.DomUtil.create('button', 'leaflet-bar');
      btn.innerHTML = '📍';
      btn.title = 'Show My Location';
      btn.style.background = '#fff';
      btn.style.padding = '6px 10px';
      btn.style.fontSize = '18px';
      btn.onclick = function() {
        map.locate({setView: true, maxZoom: 17});
      };
      return btn;
    };
    locateBtn.addTo(map);

    // Show the marker when location is found
    map.on('locationfound', function(e) {
      if (window._myloc) map.removeLayer(window._myloc);
      window._myloc = L.circleMarker(e.latlng, {
        radius: 10, fillColor: '#3399ff', color: '#3399ff',
        fillOpacity: 0.4, weight: 2
      }).addTo(map).bindPopup('You are here').openPopup();
    });

    map.on('locationerror', function(e) {
      alert('Unable to access your location.');
    });
  </script>
