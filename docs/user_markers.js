// --- User Marker Logic ---
var CH = window.CityHive;

/**
 * Return the pulse color for a given marker type.
 * @param {string} type
 */
const getPulseColor = type => {
  switch ((type || '').toLowerCase()) {
    case 'swarm': return '#ff6e44';
    case 'hive': return '#6e44ff';
    case 'tree': return '#44ff6e';
    case 'structure': return '#ffaa00';
    default: return '#6e44ff';
  }
};

/**
 * Create the Leaflet circle used as a radius indicator.
 * Returns null if radius should not be shown.
 */
const createPulseCircle = (tree, color) => {
  if (tree.showRadius === false) return null;
  return L.circle([tree.lat, tree.lng], {
    radius: 60,
    color,
    fillColor: color,
    fillOpacity: 0.18,
    weight: 1,
    opacity: 0.35,
    interactive: false
  }).addTo(CH.map);
};

/**
 * Returns SVG markup for the marker icon based on type.
 */
const getIconHtml = type => {
  switch ((type || '').toLowerCase()) {
    case 'hive':
      return `<svg width="28" height="28" viewBox="0 0 28 28"><ellipse cx="14" cy="20" rx="8" ry="5" fill="#ffb300" stroke="#b26a00" stroke-width="2"/><ellipse cx="14" cy="15" rx="6" ry="4" fill="#ffd54f" stroke="#b26a00" stroke-width="2"/><ellipse cx="14" cy="11" rx="4" ry="3" fill="#ffe082" stroke="#b26a00" stroke-width="2"/><ellipse cx="14" cy="8" rx="2.5" ry="2" fill="#fffde7" stroke="#b26a00" stroke-width="2"/></svg>`;
    case 'swarm':
      return `<svg width="28" height="28" viewBox="0 0 28 28"><circle cx="9" cy="15" r="3" fill="#ffb300" stroke="#6e4400" stroke-width="1.2"/><ellipse cx="9" cy="13.5" rx="1.2" ry="2.2" fill="#fff" stroke="#6e4400" stroke-width="0.7"/><circle cx="14" cy="11" r="2.2" fill="#ffb300" stroke="#6e4400" stroke-width="1.2"/><ellipse cx="14" cy="9.7" rx="0.9" ry="1.7" fill="#fff" stroke="#6e4400" stroke-width="0.7"/><circle cx="18" cy="17" r="2.1" fill="#ffb300" stroke="#6e4400" stroke-width="1.2"/><ellipse cx="18" cy="15.7" rx="0.8" ry="1.5" fill="#fff" stroke="#6e4400" stroke-width="0.7"/></svg>`;
    case 'tree':
      return `<svg width="28" height="28" viewBox="0 0 28 28"><ellipse cx="14" cy="14" rx="7" ry="8" fill="#44ff6e" stroke="#1b5e20" stroke-width="2"/><rect x="12" y="18" width="4" height="6" fill="#8d6e63" stroke="#5d4037" stroke-width="1.2"/></svg>`;
    case 'structure':
      return `<svg width="28" height="28" viewBox="0 0 28 28"><rect x="7" y="14" width="14" height="8" fill="#ffaa00" stroke="#6e4400" stroke-width="2"/><polygon points="14,6 6,14 22,14" fill="#ffe082" stroke="#6e4400" stroke-width="2"/></svg>`;
    default:
      return '';
  }
};

/** Build the popup HTML for a user marker. */
const buildPopupHtml = tree => {
  const displayType = tree.type ? `${tree.type.charAt(0).toUpperCase()}${tree.type.slice(1)}` : 'Hive';
  let html = `<strong>${tree.name ? `${tree.name} (` : ''}User ${displayType}${tree.name ? ')' : ''}</strong><br>`;
  if (tree.notes) html += `<em>${tree.notes}</em><br>`;
  if (tree.photoUrl) html += `<img src='${tree.photoUrl}' style='max-width:120px;max-height:120px;border-radius:8px;margin:6px 0;'><br>`;
  if (tree.timestamp) {
    const d = new Date(tree.timestamp);
    html += `<small>Added: ${d.toLocaleString()}</small><br>`;
  }
  html += `<button class="edit-marker-btn" data-id="${tree.id}">Edit</button> `;
  html += `<button class="delete-marker-btn" data-id="${tree.id}">Delete</button>`;
  return html;
};

const saveUserTrees = () => {
  localStorage.setItem('userTrees', JSON.stringify(CH.userTrees));
};
CH.saveUserTrees = saveUserTrees;

CH.userTrees = JSON.parse(localStorage.getItem('userTrees') || '[]');
window.userTrees = CH.userTrees;

CH.activeTypes = { hive: true, swarm: true, tree: true, structure: true };
const filterCheckboxes = document.querySelectorAll('#typeFilters input[type="checkbox"]');
filterCheckboxes.forEach(cb => {
  CH.activeTypes[cb.dataset.type] = cb.checked;
  cb.addEventListener('change', () => {
    CH.activeTypes[cb.dataset.type] = cb.checked;
    drawUserMarkers();
  });
});

const exportUserMarkers = () => {
  const data = CH.userTrees.map(({type, lat, lng, notes, timestamp, id, name, showRadius, photoUrl}) => {
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
};
CH.exportUserMarkers = exportUserMarkers;

const importUserMarkers = () => {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json,application/json';
  input.style.display = 'none';
  input.onchange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      try {
        const data = JSON.parse(ev.target.result);
        if (!Array.isArray(data)) throw new Error('Invalid format');
        let changed = false;
        data.forEach(item => {
          if (!item || typeof item !== 'object') return;
          if (typeof item.lat !== 'number' || typeof item.lng !== 'number' || !item.id) return;
          const { type, lat, lng, notes, timestamp, id, name, showRadius, photoUrl } = item;
          const existing = CH.userTrees.find(t => String(t.id) === String(id));
          if (existing) {
            Object.assign(existing, { type, lat, lng, notes, timestamp, name, showRadius });
            if (photoUrl) existing.photoUrl = photoUrl;
          } else {
            const newTree = { type, lat, lng, notes, timestamp, id, name, showRadius };
            if (photoUrl) newTree.photoUrl = photoUrl;
            CH.userTrees.push(newTree);
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
        alert(`Failed to import markers: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };
  document.body.appendChild(input);
  input.click();
  document.body.removeChild(input);
};
CH.importUserMarkers = importUserMarkers;

const deleteAllUserMarkers = () => {
  if (!confirm('Delete ALL your markers?')) return;
  CH.userTrees = [];
  window.userTrees = CH.userTrees;
  saveUserTrees();
  drawUserMarkers();
};
CH.deleteAllUserMarkers = deleteAllUserMarkers;

// Remove all previous marker layers
const clearUserMarkersFromMap = () => {
  if (CH.userMarkerLayers) {
    CH.userMarkerLayers.forEach(layer => CH.map.removeLayer(layer));
  }
  CH.userMarkerLayers = [];
};
CH.clearUserMarkersFromMap = clearUserMarkersFromMap;

// Draw user markers
const drawUserMarkers = () => {
  clearUserMarkersFromMap();
  CH.userTrees.forEach(tree => {
    if (CH.activeTypes && CH.activeTypes[tree.type || 'hive'] === false) return;
    const color = getPulseColor(tree.type);
    const pulse = createPulseCircle(tree, color);

    let marker;
    const iconHtml = getIconHtml(tree.type);
    if (iconHtml) {
      const divIcon = L.divIcon({
        className: 'custom-marker-icon',
        html: iconHtml,
        iconSize: [28, 28],
        iconAnchor: [14, 22],
        popupAnchor: [0, -18]
      });
      marker = L.marker([tree.lat, tree.lng], { icon: divIcon }).addTo(CH.map);
    } else {
      marker = L.circleMarker([tree.lat, tree.lng], {
        radius: 7,
        fillColor: color,
        color,
        weight: 2,
        opacity: 1,
        fillOpacity: 0.85
      }).addTo(CH.map);
    }

    marker.bindPopup(buildPopupHtml(tree));

    if (pulse) CH.userMarkerLayers.push(pulse);
    CH.userMarkerLayers.push(marker);
  });
};
CH.drawUserMarkers = drawUserMarkers;

// Initial draw
drawUserMarkers();

// Add Mode Logic
CH.addingMode = false;
window.addingMode = CH.addingMode; // legacy
const addSightingBtn = document.getElementById('addSightingBtn');
const crosshair = document.getElementById('crosshair');
const placeHereBtn = document.getElementById('placeHereBtn');
const exportMarkersBtn = document.getElementById('exportMarkersBtn');
const importMarkersBtn = document.getElementById('importMarkersBtn');
const deleteAllMarkersBtn = document.getElementById('deleteAllMarkersBtn');
if (exportMarkersBtn) exportMarkersBtn.onclick = exportUserMarkers;
if (importMarkersBtn) importMarkersBtn.onclick = importUserMarkers;
if (deleteAllMarkersBtn) deleteAllMarkersBtn.onclick = deleteAllUserMarkers;
// Removed duplicate declaration of addTreeForm to fix JS error

addSightingBtn.onclick = () => {
  if (!CH.addingMode) {
    CH.addingMode = true;
    addSightingBtn.classList.add('adding');
    crosshair.style.display = 'block';
    placeHereBtn.style.display = 'block';
    CH.map._container.focus();
  } else {
    cancelAddMode();
  }
};

const cancelAddMode = () => {
  CH.addingMode = false;
  addSightingBtn.classList.remove('adding');
  crosshair.style.display = 'none';
  placeHereBtn.style.display = 'none';
};

placeHereBtn.onclick = () => {
  if (!CH.addingMode) return;
  const center = CH.map.getCenter();
  document.getElementById('latInput').value = center.lat;
  document.getElementById('lngInput').value = center.lng;
  addTreeForm.style.display = 'block';
  cancelAddMode();
};

placeHereBtn.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    placeHereBtn.click();
  }
});

// Only declare addTreeForm once at the top of the script or before first use
const addTreeForm = document.getElementById('addTreeForm');
let editingMarkerId = null;
const photoInputEl = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
if (photoInputEl) {
  photoInputEl.addEventListener('change', e => {
    const file = e.target.files[0];
    if (file) {
      photoPreview.src = URL.createObjectURL(file);
      photoPreview.style.display = 'block';
    } else {
      photoPreview.src = '';
      photoPreview.style.display = 'none';
    }
  });
}

// Add error message display below the form
let errorMsg = document.createElement('div');
errorMsg.id = 'markerErrorMsg';
errorMsg.style.color = '#b22222';
errorMsg.style.margin = '8px 0 0 0';
errorMsg.style.fontWeight = '600';
errorMsg.style.display = 'none';
addTreeForm.appendChild(errorMsg);

const showMarkerError = msg => {
  errorMsg.textContent = msg;
  errorMsg.style.display = 'block';
};
const clearMarkerError = () => {
  errorMsg.textContent = '';
  errorMsg.style.display = 'none';
};

const uploadPhoto = async file => {

  console.log('Starting photo upload:', file.name, file.size + ' bytes');
  const maxRetries = 3;
  let attempt = 0;
  const storageRef = firebase.storage().ref();
  const fileName =
    'marker_photos/' + Date.now() + '_' + file.name.replace(/[^a-zA-Z0-9.]/g, '_');
  const photoRef = storageRef.child(fileName);

  while (attempt < maxRetries) {
    try {
      const snapshot = await photoRef.put(file);
      const url = await snapshot.ref.getDownloadURL();
      console.log('Photo uploaded successfully:', url);
      return url;
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
  addTreeForm.addEventListener('submit', async ev => {
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
      const marker = CH.userTrees.find(t => String(t.id) === String(editingMarkerId));
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
      CH.userTrees.push(newTree);
    }

    saveUserTrees();
    drawUserMarkers();
    addTreeForm.reset();
    document.getElementById('photoPreview').style.display = 'none';
    addTreeForm.style.display = 'none';
    clearMarkerError();
  });
  // Cancel button
  addTreeForm.querySelector('button[type="button"]').onclick = () => {
    addTreeForm.style.display = 'none';
    editingMarkerId = null;
    photoPreview.style.display = 'none';
    clearMarkerError();
  };
}

// --- Edit Marker Logic ---
CH.map.on('popupopen', e => {
  const editBtn = e.popup._contentNode.querySelector('.edit-marker-btn');
  if (editBtn) {
    L.DomEvent.disableClickPropagation(editBtn);
    editBtn.addEventListener('click', ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const markerId = editBtn.getAttribute('data-id');
      const marker = CH.userTrees.find(t => String(t.id) === String(markerId));
      if (marker) {
        document.getElementById('typeInput').value = marker.type || '';
        document.getElementById('latInput').value = marker.lat;
        document.getElementById('lngInput').value = marker.lng;
        document.getElementById('nameInput').value = marker.name || '';
        document.getElementById('notesInput').value = marker.notes || '';
        document.getElementById('showRadiusInput').checked = marker.showRadius !== false;
        if (marker.photoUrl) {
          photoPreview.src = marker.photoUrl;
          photoPreview.style.display = 'block';
        } else {
          photoPreview.style.display = 'none';
        }
        editingMarkerId = marker.id;
        addTreeForm.style.display = 'block';
        CH.map.closePopup();
      }
    });
  }
  const deleteBtn = e.popup._contentNode.querySelector('.delete-marker-btn');
  if (deleteBtn) {
    L.DomEvent.disableClickPropagation(deleteBtn);
    deleteBtn.addEventListener('click', async ev => {
      ev.preventDefault();
      ev.stopPropagation();
      const markerId = deleteBtn.getAttribute('data-id');
      // Find marker to get photo URL
      const marker = CH.userTrees.find(t => String(t.id) === String(markerId));
      // Remove from userTrees and update localStorage
      CH.userTrees = CH.userTrees.filter(t => String(t.id) !== String(markerId));
      saveUserTrees();
      // Remove photo from Firebase Storage if exists
      if (marker && marker.photoUrl) {
        try {
          // Extract the path from the photoUrl
          const baseUrl = firebase.storage().ref().toString();
          const path = marker.photoUrl.split(`${baseUrl}/`)[1];
          if (path) {
            await firebase.storage().ref(path).delete();
          }
        } catch (err) {
          // Ignore errors (file may already be gone)
        }
      }
      CH.map.closePopup();
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
