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
    // Pulse (toggleable)
    var pulse = null;
    if (tree.showRadius !== false) { // default to true if undefined
      pulse = L.circle([tree.lat, tree.lng], {
        radius: 60,
        color: pulseColor,
        fillColor: pulseColor,
        fillOpacity: 0.18,
        weight: 1,
        opacity: 0.35,
        interactive: false
      }).addTo(window.map);
    }
    // Marker
    var marker = L.circleMarker([tree.lat, tree.lng], {
      radius: 7,
      fillColor: pulseColor,
      color: pulseColor,
      weight: 2,
      opacity: 1,
      fillOpacity: 0.85
    }).addTo(window.map);

    // Popup text – type, name, notes, and buttons
    let displayType = tree.type ? tree.type.charAt(0).toUpperCase() + tree.type.slice(1) : "Hive";
    let popup = `<strong>${tree.name ? tree.name + ' (' : ''}User ${displayType}${tree.name ? ')' : ''}</strong><br>`;
    if (tree.notes) popup += `<em>${tree.notes}</em><br>`;
    popup += `<button class="edit-marker-btn" data-id="${tree.id}">Edit</button> `;
    popup += `<button class="delete-marker-btn" data-id="${tree.id}">Delete</button>`;
    marker.bindPopup(popup);

    // Save for later removal
    if (pulse) window._userMarkerLayers.push(pulse);
    window._userMarkerLayers.push(marker);
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
  var name = document.getElementById('nameInput').value;
  var notes = document.getElementById('notesInput').value;
  var showRadius = document.getElementById('showRadiusInput').checked;
  if (editingMarkerId) {
    // Edit existing marker
    var marker = window.userTrees.find(t => String(t.id) === String(editingMarkerId));
    if (marker) {
      marker.type = type;
      marker.lat = lat;
      marker.lng = lng;
      marker.name = name;
      marker.notes = notes;
      marker.showRadius = showRadius;
    }
    editingMarkerId = null;
  } else {
    // Add new marker
    var id = Date.now() + Math.random().toString(36).substr(2, 5);
    var newTree = { id, lat, lng, type, name, notes, showRadius };
    window.userTrees.push(newTree);
  }
  saveUserTrees();
  drawUserMarkers();
  addTreeForm.reset();
  addTreeForm.style.display = 'none';
};

// Cancel button
addTreeForm.querySelector('button[type="button"]').onclick = function() {
  addTreeForm.style.display = 'none';
  editingMarkerId = null;
};

// --- Edit Marker Logic ---
let editingMarkerId = null;

window.map.on('popupopen', function(e) {
  var editBtn = e.popup._contentNode.querySelector('.edit-marker-btn');
  if (editBtn) {
    L.DomEvent.disableClickPropagation(editBtn);
    editBtn.addEventListener('click', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var markerId = editBtn.getAttribute('data-id');
      var marker = window.userTrees.find(t => String(t.id) === String(markerId));
      if (marker) {
        document.getElementById('typeInput').value = marker.type || '';
        document.getElementById('latInput').value = marker.lat;
        document.getElementById('lngInput').value = marker.lng;
        document.getElementById('nameInput').value = marker.name || '';
        document.getElementById('notesInput').value = marker.notes || '';
        document.getElementById('showRadiusInput').checked = marker.showRadius !== false;
        editingMarkerId = marker.id;
        addTreeForm.style.display = 'block';
        window.map.closePopup();
      }
    });
  }
  var btn = e.popup._contentNode.querySelector('.delete-marker-btn');
  if (btn) {
    L.DomEvent.disableClickPropagation(btn);
    btn.addEventListener('click', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var markerId = btn.getAttribute('data-id');
      window.userTrees = window.userTrees.filter(t => String(t.id) !== String(markerId));
      saveUserTrees();
      window.map.closePopup();
      setTimeout(drawUserMarkers, 200);
    });
  }
});
