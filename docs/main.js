<script>
    // Map init
    var map = L.map('map').setView([40.75, -73.95], 11);

    // Muted basemap
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> contributors'
    }).addTo(map);
  </script>
