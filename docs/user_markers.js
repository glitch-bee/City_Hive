// --- User Marker Logic (cleaned & working Delete, no species/dbh) ---
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

window.userTrees = JSON.parse(localStorage.getItem('userTrees') || '[]');

// Remove all previous marker layers
function clearUserMarkersFromMap() {
  if (window._userMarkerLayers) {
    window._userMarkerLayers.forEach(layer => window.map.removeLayer(layer));
  }
  window._userMarkerLayers = [];
}

// Draw user markers
function drawUserMarkers() {
  clearUserMarkersFromMap();
  window.userTrees.forEach(function(tree) {
    var pulseColor = getPulseColor(tree.type);
    // Pulse
    var pulse = L.circle([tree.lat, tree.lng], {
      radius: 60,
      color: pulseColor,
      fillColor: pulseColor,
      fillOpacity: 0.18,
      weight: 1,
      opacity: 0.35,
      interactive: false
    }).addTo(window.map);
    // Marker
    var marker = L.circleMarker([tree.lat, tree.lng], {
      radius: 7,
      fillColor: pulseColor,
      color: pulseColor,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(window.map);

    // Popup text – just type and delete button
    let displayType = tree.type ? tree.type.charAt(0).toUpperCase() + tree.type.slice(1) : "Hive";
    let popup = `<strong>User ${displayType}</strong><br>`;
    popup += `<button class="delete-marker-btn" data-id="${tree.id}">Delete</button>`;

    marker.bindPopup(popup);

    // Save for later removal
    window._userMarkerLayers.push(pulse, marker);
  });
}

// Initial draw
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

placeHereBtn.onclick = function() {
  if (!window.addingMode) return;
  var center = window.map.getCenter();
  document.getElementById('latInput').value = center.lat;
  document.getElementById('lngInput').value = center.lng;
  addTreeForm.style.display = 'block';
  cancelAddMode();
};

placeHereBtn.addEventListener('keydown', function(e) {
  if (e.key === "Enter") e.preventDefault();
});

// --- Form Submission ---
addTreeForm.onsubmit = function(ev) {
  ev.preventDefault();
  var type = document.getElementById('typeInput').value;
  var lat = parseFloat(document.getElementById('latInput').value);
  var lng = parseFloat(document.getElementById('lngInput').value);
  var id = Date.now() + Math.random().toString(36).substr(2, 5);
  var newTree = { id, lat, lng, type };
  window.userTrees.push(newTree);
  saveUserTrees();
  drawUserMarkers();
  addTreeForm.reset();
  addTreeForm.style.display = 'none';
};

// Cancel button
addTreeForm.querySelector('button[type="button"]').onclick = function() {
  addTreeForm.style.display = 'none';
};

// --- Delete Button Logic ---
window.map.on('popupopen', function(e) {
  var btn = e.popup._contentNode.querySelector('.delete-marker-btn');
  if (btn) {
    // Prevent Leaflet from closing the popup on button click
    L.DomEvent.disableClickPropagation(btn);
    btn.addEventListener('click', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var markerId = btn.getAttribute('data-id');
      // Remove from userTrees and update localStorage
      window.userTrees = window.userTrees.filter(t => String(t.id) !== String(markerId));
      saveUserTrees();
      // Remove all popups before redrawing
      window.map.closePopup();
      // Redraw after popup closes to avoid race with Leaflet
      setTimeout(drawUserMarkers, 200);
    });
  }
});
