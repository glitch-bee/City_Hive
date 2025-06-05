import { createMap } from './map.js';
import { setupPublicMarkers } from './markers.js';
import { initUserMarkers } from './user_markers.js';
import { setupUI } from './ui.js';
import { app, db, storage, auth } from './firebaseConfig.js';

const map = createMap();
const { markers } = setupPublicMarkers(map);
initUserMarkers(map, { db, storage, auth });
setupUI(map, markers);
