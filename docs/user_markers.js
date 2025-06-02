// --- User Tree/Structure Annotation: Add Mode with Crosshair ---
// Utility to get color by type
function getPulseColor(type) {
  switch ((type || '').toLowerCase()) {
    case 'swarm': return "#ff6e44";
    case 'hive': return "#6e44ff";
    case 'tree': return "#44ff6e";
    case 'structure': return "#ffaa00";
    default: return "#6e44ff";
  }
}

function saveUserTrees() {
  localStorage.setItem('userTrees', JSON.stringify(window.userTrees));
}

// Initialize user tree array from storage, or empty
window.userTrees = JSON.parse(localStorage.getItem('userTrees') || '[]');

// Function to (re)draw all user markers (pulse + marker)
function drawUserMarkers() {
  // Remove any existing user marker layers
  if (window._userMarkerLayers) {
    window._userMarkerLayers.forEach(layer => window.map.removeLayer(layer));
  }
  window._userMarkerLayers = [];

  window.userTrees.forEach(function(tree) {
    var pulseColor = getPulseColor(tree.type);
    // Draw the pulse radius
    var pulse = L.circle([tree.lat, tree.lng], {
      radius: 60,
      color: pulseColor,
      fillColor: pulseColor,
      fillOpacity: 0.18,
      weight: 1,
      opacity: 0.35,
      interactive: false
    }).addTo(window.map);

    // Draw the marker on top
    var marker = L.circleMarker([tree.lat, tree.lng], {
      radius: 7,
      fillColor: pulseColor,
      color: pulseColor,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(window.map);

    // Build popup with delete button and details
    var popup = `<strong>User Marker</strong><br>
      Type: ${tree.type ? tree.type.charAt(0).toUpperCase() + tree.type.slice(1) : 'Hive'}<br>
      ${tree.species ? "Species: " + tree.species + "<br>" : ""}
      ${tree.dbh ? "DBH: " + tree.dbh + " cm<br>" : ""}
      <button class="delete-marker-btn" data-id="${tree.id}">Delete</button>`;

    marker.bindPopup(popup);

    // Track layers for later removal
    window._userMarkerLayers.push(pulse, marker);
  });
}

// Draw user markers initially
drawUserMarkers();

// Add Mode Logic
window.addingMode = false;
var addTreeBtn = document.getElementById('addTreeBtn');
var crosshair = document.getElementById('crosshair');
var placeHereBtn = document.getElementById('placeHereBtn');
var addTreeForm = document.getElementById('addTreeForm');

addTreeBtn.onclick = function() {
  if (!window.addingMode) {
    window.addingMode = true;
    addTreeBtn.classList.add('adding');
    crosshair.style.display = 'block';
    placeHereBtn.style.display = 'block';
    window.map._container.focus();
  } else {
    cancelAddMode();
  }
};

function cancelAddMode() {
  window.addingMode = false;
  addTreeBtn.classList.remove('adding');
  crosshair.style.display = 'none';
  placeHereBtn.style.display = 'none';
}

// Place here button logic
placeHereBtn.onclick = function() {
  if (!window.addingMode) return;
  var center = window.map.getCenter();
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

  // Assign unique id to each marker
  var id = Date.now() + Math.random().toString(36).substr(2, 5);

  var newTree = { id, lat, lng, species, dbh, type };

  // Add to user tree array
  window.userTrees.push(newTree);
  saveUserTrees();

  // Redraw all markers
  drawUserMarkers();

  addTreeForm.reset();
  addTreeForm.style.display = 'none';
};

// Cancel button resets mode
addTreeForm.querySelector('button[type="button"]').onclick = function() {
  addTreeForm.style.display = 'none';
};

// Listen for Delete button clicks in user marker popups
window.map.on('popupopen', function(e) {
  var btn = e.popup._contentNode.querySelector('.delete-marker-btn');
  if (btn) {
    btn.onclick = function() {
      var markerId = btn.getAttribute('data-id');
      // Remove from localStorage
      window.userTrees = window.userTrees.filter(t => t.id !== markerId);
      saveUserTrees();
      // Redraw all markers
      drawUserMarkers();
      window.map.closePopup();
    };
  }
});
