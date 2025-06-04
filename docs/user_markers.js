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

function exportUserMarkers() {
  const data = window.userTrees.map(({type, lat, lng, notes, timestamp, id, name, showRadius, photoUrl}) => {
    const obj = { type, lat, lng, notes, timestamp, id, name, showRadius };
    if (photoUrl) obj.photoUrl = photoUrl;
    return obj;
  });
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const dateStr = new Date().toISOString().split('T')[0];
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `city_hive_user_markers_${dateStr}.json`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

function importUserMarkers() {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.style.display = 'none';
  input.onchange = function(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(ev) {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data)) throw new Error('Invalid format');
        let changed = false;
        data.forEach(item => {
          if (!item || typeof item !== 'object') return;
          if (typeof item.lat !== 'number' || typeof item.lng !== 'number' || !item.id) return;
          const {
            type, lat, lng, notes, timestamp, id, name, showRadius, photoUrl
          } = item;
          const existing = window.userTrees.find(t => String(t.id) === String(id));
          if (existing) {
            existing.type = type;
            existing.lat = lat;
            existing.lng = lng;
            existing.notes = notes;
            existing.timestamp = timestamp;
            existing.name = name;
            existing.showRadius = showRadius;
            if (photoUrl) existing.photoUrl = photoUrl;
          } else {
            const newTree = { type, lat, lng, notes, timestamp, id, name, showRadius };
            if (photoUrl) newTree.photoUrl = photoUrl;
            window.userTrees.push(newTree);
          }
          changed = true;
        });
        if (changed) {
          saveUserTrees();
          drawUserMarkers();
          alert('Markers imported successfully.');
        } else {
          alert('No valid markers found in file.');
        }
      } catch (err) {
        console.error('Import failed', err);
        alert('Failed to import markers: ' + err.message);
      }
    };
    reader.readAsText(file);
  };
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
}

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
    // Marker (with icon)
    let iconHtml = '';
    switch ((tree.type || '').toLowerCase()) {
      case 'hive':
        // Skep icon (simple SVG, now orange/yellow)
        iconHtml = `<svg width="28" height="28" viewBox="0 0 28 28"><ellipse cx="14" cy="20" rx="8" ry="5" fill="#ffb300" stroke="#b26a00" stroke-width="2"/><ellipse cx="14" cy="15" rx="6" ry="4" fill="#ffd54f" stroke="#b26a00" stroke-width="2"/><ellipse cx="14" cy="11" rx="4" ry="3" fill="#ffe082" stroke="#b26a00" stroke-width="2"/><ellipse cx="14" cy="8" rx="2.5" ry="2" fill="#fffde7" stroke="#b26a00" stroke-width="2"/></svg>`;
        break;
      case 'swarm':
        // Three bees (simple SVG)
        iconHtml = `<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="9" cy="15" r="3" fill="#ffb300" stroke="#6e4400" stroke-width="1.2"/><ellipse cx="9" cy="13.5" rx="1.2" ry="2.2" fill="#fff" stroke="#6e4400" stroke-width="0.7"/><circle cx="14" cy="11" r="2.2" fill="#ffb300" stroke="#6e4400" stroke-width="1.2"/><ellipse cx="14" cy="9.7" rx="0.9" ry="1.7" fill="#fff" stroke="#6e4400" stroke-width="0.7"/><circle cx="18" cy="17" r="2.1" fill="#ffb300" stroke="#6e4400" stroke-width="1.2"/><ellipse cx="18" cy="15.7" rx="0.8" ry="1.5" fill="#fff" stroke="#6e4400" stroke-width="0.7"/></svg>`;
        break;
      case 'tree':
        // Simple tree icon
        iconHtml = `<svg width="28" height="28" viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="7" ry="8" fill="#44ff6e" stroke="#1b5e20" stroke-width="2"/><rect x="12" y="18" width="4" height="6" fill="#8d6e63" stroke="#5d4037" stroke-width="1.2"/></svg>`;
        break;
      case 'structure':
        // Simple house/structure icon
        iconHtml = `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="14" width="14" height="8" fill="#ffaa00" stroke="#6e4400" stroke-width="2"/><polygon points="14,6 6,14 22,14" fill="#ffe082" stroke="#6e4400" stroke-width="2"/></svg>`;
        break;
      default:
        iconHtml = '';
    }
    var marker;
    if (iconHtml) {
      var divIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: iconHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 22],
        popupAnchor: [0, -18]
      });
      marker = L.marker([tree.lat, tree.lng], { icon: divIcon }).addTo(window.map);
    } else {
      marker = L.circleMarker([tree.lat, tree.lng], {
        radius: 7,
        fillColor: pulseColor,
        color: pulseColor,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(window.map);
    }

    // Popup text – type, name, notes, timestamp, photo, and buttons
    let displayType = tree.type ? tree.type.charAt(0).toUpperCase() + tree.type.slice(1) : "Hive";
    let popup = `<strong>${tree.name ? tree.name + ' (' : ''}User ${displayType}${tree.name ? ')' : ''}</strong><br>`;
    if (tree.notes) popup += `<em>${tree.notes}</em><br>`;
    if (tree.photoUrl) popup += `<img src='${tree.photoUrl}' style='max-width:120px;max-height:120px;border-radius:8px;margin:6px 0;'><br>`;
    if (tree.timestamp) {
      const d = new Date(tree.timestamp);
      popup += `<small>Added: ${d.toLocaleString()}</small><br>`;
    }
    popup += `<button class="edit-marker-btn" data-id="${tree.id}">Edit</button> `;
    popup += `<button class="delete-marker-btn" data-id="${tree.id}">Delete</button>`;
    marker.bindPopup(popup);

    // Add to marker layers
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
var exportMarkersBtn = document.getElementById('exportMarkersBtn');
var importMarkersBtn = document.getElementById('importMarkersBtn');
if (exportMarkersBtn) exportMarkersBtn.onclick = exportUserMarkers;
if (importMarkersBtn) importMarkersBtn.onclick = importUserMarkers;
// Removed duplicate declaration of addTreeForm to fix JS error

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

// Only declare addTreeForm once at the top of the script or before first use
const addTreeForm = document.getElementById('addTreeForm');
let editingMarkerId = null;

// Add error message display below the form
let errorMsg = document.createElement('div');
errorMsg.id = 'markerErrorMsg';
errorMsg.style.color = '#b22222';
errorMsg.style.margin = '8px 0 0 0';
errorMsg.style.fontWeight = '600';
errorMsg.style.display = 'none';
addTreeForm.appendChild(errorMsg);

function showMarkerError(msg) {
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
}
function clearMarkerError() {
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
}

async function uploadPhoto(file) {
  const maxRetries = 3;
  let attempt = 0;
  const storageRef = firebase.storage().ref();
  const fileName = 'marker_photos/' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const photoRef = storageRef.child(fileName);

  while (attempt < maxRetries) {
    try {
      const snapshot = await photoRef.put(file);
      return await snapshot.ref.getDownloadURL();
    } catch (err) {
      console.error(`Photo upload failed on attempt ${attempt + 1}:`, err);
      attempt++;
      if (attempt >= maxRetries) {
        throw new Error('Max retry limit reached for photo upload.');
      }
    }
  }
}

if (addTreeForm) {
  addTreeForm.addEventListener('submit', async function(ev) {
    ev.preventDefault();
    clearMarkerError();
    const type = document.getElementById('typeInput').value;
    const lat = parseFloat(document.getElementById('latInput').value);
    const lng = parseFloat(document.getElementById('lngInput').value);
    const name = document.getElementById('nameInput').value;
    const notes = document.getElementById('notesInput').value;
    const showRadius = document.getElementById('showRadiusInput').checked;
    const photoInput = document.getElementById('photoInput');
    let photoUrl = null;

    if (photoInput && photoInput.files && photoInput.files[0]) {
      const file = photoInput.files[0];
      if (file.size > 5 * 1024 * 1024) { // Limit file size to 5MB
        showMarkerError('Photo size exceeds 5MB limit.');
        return;
      }
      try {
        photoUrl = await uploadPhoto(file);
      } catch (err) {
        showMarkerError('Photo upload failed: ' + err.message);
        return;
      }
    }

    if (editingMarkerId) {
      const marker = window.userTrees.find(t => String(t.id) === String(editingMarkerId));
      if (marker) {
        marker.type = type;
        marker.lat = lat;
        marker.lng = lng;
        marker.name = name;
        marker.notes = notes;
        marker.showRadius = showRadius;
        if (photoUrl) marker.photoUrl = photoUrl;
      }
      editingMarkerId = null;
    } else {
      const id = Date.now() + Math.random().toString(36).substr(2, 5);
      const timestamp = Date.now();
      const newTree = { id, lat, lng, type, name, notes, showRadius, timestamp };
      if (photoUrl) newTree.photoUrl = photoUrl;
      window.userTrees.push(newTree);
    }

    saveUserTrees();
    drawUserMarkers();
    addTreeForm.reset();
    document.getElementById('photoPreview').style.display = 'none';
    addTreeForm.style.display = 'none';
    clearMarkerError();
  });
  // Cancel button
  addTreeForm.querySelector('button[type="button"]').onclick = function() {
    addTreeForm.style.display = 'none';
    editingMarkerId = null;
    clearMarkerError();
  };
}

// --- Edit Marker Logic ---
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
    btn.addEventListener('click', async function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var markerId = btn.getAttribute('data-id');
      // Find marker to get photo URL
      var marker = window.userTrees.find(t => String(t.id) === String(markerId));
      // Remove from userTrees and update localStorage
      window.userTrees = window.userTrees.filter(t => String(t.id) !== String(markerId));
      saveUserTrees();
      // Remove photo from Firebase Storage if exists
      if (marker && marker.photoUrl) {
        try {
          // Extract the path from the photoUrl
          var baseUrl = firebase.storage().ref().toString();
          var path = marker.photoUrl.split(baseUrl + '/')[1];
          if (path) {
            await firebase.storage().ref(path).delete();
          }
        } catch (err) {
          // Ignore errors (file may already be gone)
        }
      }
      window.map.closePopup();
      setTimeout(drawUserMarkers, 200);
    });
  }
});
/* Add to CSS in index.html for custom marker icons:
.custom-marker-icon {
  border-radius: 50%;
  background: none;
  box-shadow: 0 2px 8px rgba(110,68,255,0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
*/
