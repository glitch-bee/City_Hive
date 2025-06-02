<script>
    // --- User Tree Annotation: Add Mode with Crosshair ---
    function saveUserTrees() {
      localStorage.setItem('userTrees', JSON.stringify(userTrees));
    }

    var userTrees = JSON.parse(localStorage.getItem('userTrees') || '[]');

    // Draw saved user markers (pulse circle + marker)
    userTrees.forEach(function(tree) {
      var pulseColor = tree.type === "swarm" ? "#ff6e44" : "#6e44ff";
      // Draw the pulse radius
      L.circle([tree.lat, tree.lng], {
        radius: 60,
        color: pulseColor,
        fillColor: pulseColor,
        fillOpacity: 0.18,
        weight: 1,
        opacity: 0.35,
        interactive: false
      }).addTo(map);
      // Draw the marker on top
      var marker = L.circleMarker([tree.lat, tree.lng], {
        radius: 7,
        fillColor: pulseColor,
        color: pulseColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(map);
      var popup = '<strong>User Tree</strong><br>Type: ' + (tree.type || 'hive') + '<br>';
      if (tree.species) popup += 'Species: ' + tree.species + '<br>';
      if (tree.dbh) popup += 'DBH: ' + tree.dbh + ' cm<br>';
      marker.bindPopup(popup);
    });

    // Add Mode Logic
    var addingMode = false;
    var addTreeBtn = document.getElementById('addTreeBtn');
    var crosshair = document.getElementById('crosshair');
    var placeHereBtn = document.getElementById('placeHereBtn');
    var addTreeForm = document.getElementById('addTreeForm');

    addTreeBtn.onclick = function() {
      if (!addingMode) {
        addingMode = true;
        addTreeBtn.classList.add('adding');
        crosshair.style.display = 'block';
        placeHereBtn.style.display = 'block';
        map._container.focus();
      } else {
        cancelAddMode();
      }
    };

    function cancelAddMode() {
      addingMode = false;
      addTreeBtn.classList.remove('adding');
      crosshair.style.display = 'none';
      placeHereBtn.style.display = 'none';
    }

    // Place here button logic
    placeHereBtn.onclick = function() {
      if (!addingMode) return;
      var center = map.getCenter();
      document.getElementById('latInput').value = center.lat;
      document.getElementById('lngInput').value = center.lng;
      addTreeForm.style.display = 'block';
      cancelAddMode();
    };

    placeHereBtn.addEventListener('keydown', function(e) {
      if (e.key === "Enter") {
        e.preventDefault();
      }
    });

    // Handle user annotation form submission
    addTreeForm.onsubmit = function(ev) {
      ev.preventDefault();
      var type = document.getElementById('typeInput').value;
      var species = document.getElementById('speciesInput').value;
      var dbh = document.getElementById('dbhInput').value;
      var lat = parseFloat(document.getElementById('latInput').value);
      var lng = parseFloat(document.getElementById('lngInput').value);

      var pulseColor = type === "swarm" ? "#ff6e44" : "#6e44ff";

      // Draw pulse radius
      L.circle([lat, lng], {
        radius: 60,
        color: pulseColor,
        fillColor: pulseColor,
        fillOpacity: 0.18,
        weight: 1,
        opacity: 0.35,
        interactive: false
      }).addTo(map);

      // Draw marker
      var marker = L.circleMarker([lat, lng], {
        radius: 7,
        fillColor: pulseColor,
        color: pulseColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(map);

      var popup = '<strong>User Tree</strong><br>Type: ' + type.charAt(0).toUpperCase() + type.slice(1) + '<br>';
      if (species) popup += 'Species: ' + species + '<br>';
      if (dbh) popup += 'DBH: ' + dbh + ' cm<br>';
      marker.bindPopup(popup);

      userTrees.push({lat, lng, species, dbh, type});
      saveUserTrees();
      addTreeForm.reset();
      addTreeForm.style.display = 'none';
    };

    // Cancel button resets mode
    addTreeForm.querySelector('button[type="button"]').onclick = function() {
      addTreeForm.style.display = 'none';
    };
  </script>
