# City_Hive Project Notes (Beta Status, Fall 2025)

## Hosted Site

<https://city-hive-90f1e.web.app/>

## Overview

City_Hive is a browser-based dashboard to map feral honey bee sightings and likely cavity trees in NYC, visualized against city tree census data. Built for the NY Bee Club, researchers, and land stewards.
**Tech stack:** Python (data prep), Leaflet.js (frontend map), no backend (MVP), user annotation with localStorage.

---

## **Current Features**

- **Map all citywide trees (DBH 35–80cm) as clustered, color-coded points**
- **“Add New Sighting” mode with crosshair UI (mobile & desktop friendly):**
  - Click “Add New Sighting,” pan/zoom so the crosshair sits on the spot, tap “Place Here”
  - Fill out the form with type, notes and optional photo, confirm to save
  - All user-added markers show custom icons
  - **User annotations persist via localStorage** (per device)
- **Legend explaining species color codes and user markers**
- **Performance: MarkerCluster used, no cluster-zoom on click (unclusters only on zoom-in)**
- **Modern, muted basemap (CartoDB Positron) for visual clarity**
- **Works from static hosting (e.g., Firebase Hosting or GitHub Pages, no server required)**

---

## **To Do / Next Steps**

### **Core Mapping/Data:**

- [ ] **Add Staten Island trees to citywide GeoJSON (verify all boroughs are present)**
- [ ] **Improve species and DBH filtering if needed (optionally make dynamic)**
- [ ] **Support additional “structure” annotations (e.g., sheds, walls) in UI**

### **User Annotation/Interaction:**
- [X] **Enable deleting markers**
- [X] **Add “Clear All” option for user annotations (reset localStorage)**
- [X] **Optionally support export/import of user annotations (share or backup local points)**
- [ ] **(Future) Support backend or shared annotation features (Firebase/Supabase/etc.)**

### **Data Tracking/Trends:**
- [X] **Develop a time-stamped user annotation system (track when/what was added)**
- [ ] **Design methods to visualize trends (e.g., heatmaps, time sliders, year-over-year change)**
- [ ] **Enable “historical” layers or views (compare sightings/trees over time)**

### **UI/UX Improvements:**
 [ ] **Streamline annotation form and controls for clarity**
- [ ] **Polish legend and on-map instructions**
- [ ] **Make UI consistent and mobile-first**
- [X] **Optionally add structure/hive icons for other feature types**

### **Pilot & Feedback:**
 [ ] **Invite NYBC members for pilot testing**
 [ ] **Collect feedback on usability, performance, and privacy**
 [ ] **Iterate: address bugs, clarify instructions, simplify where needed**

---

## **Known Issues**

- Annotations are local-only; cloud sync is not yet available.
- Date-based filtering of markers is still in development.
- Trend visualizations are not yet implemented.
- Minor UI polish is ongoing.

---

## **Tech Notes**

- **Data file:** `full_boro_filtered.geojson` in the `docs` directory
- **Frontend:** `index.html` (or `docs/index.html` for static hosting)
- **Local user markers:** stored via `localStorage` as `userTrees`
- **Cluster behavior:** clusters only break up by zoom (not by click)
- **No backend required; Firebase optional for photos**

---

## **Contacts / Lead**
Usher  ( pres.qns@nybeeclub.org )
NY Bee Club  
Last updated: 2025-09-05

---

