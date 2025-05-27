# Bee Tree and Swarm Trap Mapping – Project Plan

## Overview

bee_tree is a browser-based dashboard for mapping feral honey bee sightings and potential nest sites in NYC, visualizing these in relation to urban forestry data. It uses Python for data processing and Leaflet.js for interactive mapping, integrating open datasets like the NYC Street Tree Census.

---

## Goals

- **Map wild bee colonies and swarm trap sites across NYC**
- **Support privacy, ecological responsibility, and stewardship**
- **Enable user annotation and year-over-year tracking**
- **Prepare for collaboration with NY Bee Club, city agencies, and researchers**

---

## Project Stages & Status

### 1. Data Preparation
- [x] Filtered and cleaned NYC Tree Census data for all boroughs
- [x] Converted CSVs to GeoJSON for mapping
- [x] Merged borough data for citywide analysis
- [ ] (Optional) Further filter by species and DBH for “likely bee trees”

### 2. Mapping Prototype
- [x] Leaflet.js map displays all trees as points (citywide)
- [x] Performance tested with large datasets
- [ ] Add clustering or filters for usability if needed
- [ ] (Later) Add neighborhood outlines as a non-intrusive overlay

### 3. User Input and Annotation
- [x] Basic form for adding user markers (bee trees, swarm traps)
- [ ] Persist user input (localStorage, downloadable file, or backend)
- [ ] Allow marker categories and notes
- [ ] Link user-submitted locations back to the map for review

### 4. Privacy and Safeguards
- [ ] Obscure precise hive locations (e.g., round/jitter coordinates)
- [ ] Anonymize all user submissions (no names/emails in public views)
- [ ] Include stewardship guidelines and privacy reminders in UI
- [ ] (Optional) Moderate or approve tags before adding to the map

### 5. Pilot Testing
- [ ] Invite NYBC members for pilot testing
- [ ] Collect feedback on usability, privacy, and educational value
- [ ] Iterate and improve based on feedback

### 6. Expansion Planning
- [ ] Plan for full NYC rollout and scalable backend
- [ ] Explore backend/database options (Firebase, Supabase, etc.)
- [ ] Draft additional educational resources and outreach materials

---

## Technical Stack

- **Frontend:** Leaflet.js (interactive map)
- **Data:** Cleaned CSV and GeoJSON for tree data; user input via form
- **Backend (future):** Cloud database for persistent, real-time submissions

---

## Risks and Considerations

- Browser performance with large datasets
- User privacy and property rights
- Ecological responsibility (protect wild colonies)
- Need for moderation as project scales

---

## Next Steps

- [x] Finalize citywide data filtering/cleaning scripts
- [x] Set up local project folder and documentation
- [ ] Create and push to private GitHub repo
- [ ] Implement persistent user annotation (localStorage or backend)
- [ ] Add privacy features for sensitive locations
- [ ] Prepare for pilot testing with NYBC

---

**Prepared by:**  
Usher  
5.27.25

