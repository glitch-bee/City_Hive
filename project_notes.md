# City_Hive Project Notes (MVP Status, June 2025)

## Overview

City_Hive is a browser-based dashboard to map feral honey bee sightings and likely cavity trees in NYC, visualized against city tree census data. Built for the NY Bee Club, researchers, and land stewards.
**Tech stack:** Python (data prep), Leaflet.js (frontend map), no backend (MVP), user annotation with localStorage.

---

## **Current Features**

- **Map all citywide trees (DBH 35–80cm) as clustered, color-coded points**
- **“Add Tree” mode with crosshair UI (mobile & desktop friendly):**
  - Click “Add Tree,” pan/zoom so the crosshair sits on the spot, tap “Place Here”
  - Fill out species/DBH form, confirm to save
  - All user-added trees shown in bright green
  - **User annotations persist via localStorage** (per device)
- **Legend explaining species color codes and user markers**
- **Performance: MarkerCluster used, no cluster-zoom on click (unclusters only on zoom-in)**
- **Modern, muted basemap (CartoDB Positron) for visual clarity**
- **Works from static hosting (e.g. GitHub Pages, no server required)**

---

## **To Do / Next Steps**

### **Core Mapping/Data:**

- [ ] **Add Staten Island trees to citywide GeoJSON (verify all boroughs are present)**
- [ ] **Improve species and DBH filtering if needed (optionally make dynamic)**
- [ ] **Support additional “structure” annotations (e.g., sheds, walls) in UI**

### **User Annotation/Interaction:**
- [ ] **Enable deleting user-added trees (remove single points from localStorage/UI)**
- [ ] **Add “Clear All” option for user annotations (reset localStorage)**
- [ ] **Optionally support export/import of user annotations (share or backup local points)**
- [ ] **(Future) Support backend or shared annotation features (Firebase/Supabase/etc.)**

### **Data Tracking/Trends:**
- [ ] **Develop a time-stamped user annotation system (track when/what was added)**
- [ ] **Design methods to visualize trends (e.g., heatmaps, time sliders, year-over-year change)**
- [ ] **Enable “historical” layers or views (compare sightings/trees over time)**

### **UI/UX Improvements:**
 [ ] **Streamline annotation form and controls for clarity**
 [ ] **Polish legend and on-map instructions**
 [ ] **Make UI consistent and mobile-first**
 [ ] **Optionally add structure/hive icons for other feature types**

### **Pilot & Feedback:**
 [ ] **Invite NYBC members for pilot testing**
 [ ] **Collect feedback on usability, performance, and privacy**
 [ ] **Iterate: address bugs, clarify instructions, simplify where needed**

---

## **Known Issues**

- User annotations are local-only (cannot sync across devices or users yet)
- UI for deleting/editing user markers is not present (coming soon)
- Staten Island data missing (need to merge into citywide file)
- “Trend” features and tracking are not yet implemented
- UI/legend polish needed before broader release

---

## **Tech Notes**

- **Data file:** `full_boro_filtered.geojson` in the `docs` directory
- **Frontend:** `index.html` (or `docs/index.html` for static hosting)
- **Local user markers:** stored via `localStorage` as `userTrees`
- **Cluster behavior:** clusters only break up by zoom (not by click)
- **No backend required for MVP**

---

## **Contacts / Lead**
Usher  
NY Bee Club  
Last updated: 2025-06-01

---

