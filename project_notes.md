# Bee Tree and Swarm Trap Mapping – Project Plan

## Overview

This project builds an interactive map for NYC (starting with Staten Island) where beekeepers can:
- Tag and track locations of “bee trees” (feral colonies or hollow trees suitable for bees)
- Mark recommended or attempted swarm trap sites
- Use public tree data and community reports for better swarm management and stewardship

---

## Goals

- **Create a private, accurate pilot map for Staten Island**
- **Design with privacy, safety, and ecological responsibility in mind**
- **Test workflows for data gathering, input, and visualization**
- **Prepare for possible expansion to all five boroughs**

---

## Project Stages & Status

### 1. Data Preparation
- [x] Filtered NYC Tree Census CSV for Staten Island (`borocode = 5`)
- [x] Cleaned all latitude/longitude and property fields to remove NaN/inf and ensure GeoJSON compatibility
- [ ] (Optional, future) Further filter by species (e.g., maple, oak, sycamore) and minimum DBH for “likely bee trees”
- [x] Saved as `staten_island_trees.csv` and `staten_island_trees.geojson` for mapping

### 2. Basic Mapping Prototype
- [x] Built Leaflet.js map displaying all Staten Island trees as points using local GeoJSON
- [x] Tested map performance with the full dataset (105k+ points)
- [ ] Add clustering or filters if needed for performance/usability

---

### **NEW: API-Based Prototype (2025-05-28)**
- [x] Developed a lightweight script to query the NYC Street Tree Census API directly for filtered data (e.g., trees with DBH between 35–80 cm)
- [x] Outputs GeoJSON suitable for mapping in Leaflet.js
- [x] Added a new proof-of-concept `treetest` directory with `test.py`, `map.html`, and sample GeoJSON output
- [x] Confirmed the API approach keeps data lightweight and current without requiring local bulk files
- [ ] (Planned) Expand API usage for more dynamic queries and possibly direct-to-frontend (JavaScript-based) filtering

---

### 3. User Input and Annotation
- [ ] Decide on initial input method (Google Form, Google Sheet, or manual entry for now)
- [ ] Allow tagging of “bee trees” and swarm trap locations (with optional notes)
- [ ] Link tagged locations back to the map for review

### 4. Privacy and Safeguards
- [ ] Use only approximate locations for sensitive trees (nearest intersection or block)
- [ ] Anonymize all user submissions (no names/emails in public views)
- [ ] Include stewardship guidelines and privacy reminders in all user interfaces
- [ ] (Optional) Moderate or approve tags before adding to the map

### 5. Pilot Testing
- [ ] Invite a small group of trusted NYBC members to test the tool
- [ ] Collect feedback on usability, privacy, and educational value
- [ ] Iterate and improve based on feedback

### 6. Expansion Planning
- [ ] Plan for full NYC rollout if pilot succeeds
- [ ] Explore backend/database options for dynamic, scalable mapping
- [ ] Draft additional educational resources and outreach materials

---

## Technical Stack

- **Frontend:** Leaflet.js (interactive map)
- **Data:** Cleaned CSV and GeoJSON for tree data;  
  **NEW:** Direct API queries for real-time, filtered tree data (see `treetest/`)
- **Backend (future):** Firebase, Supabase, Airtable, or other cloud database for submissions and real-time updates

---

## Risks and Considerations

- Data volume and browser performance with large datasets
- User privacy and property rights
- Ecological responsibility (do no harm to wild colonies or habitat)
- Need for moderation as project scales

---

## Next Steps

- [x] Finalize data filtering/cleaning scripts for Staten Island
- [x] Set up local project folder
- [ ] Create and push to private GitHub repo
- [x] Add this plan and documentation to the repo
- [x] **Develop and test API-based mapping workflow (see `treetest/`)**
- [ ] Begin experimenting with user input and annotation features

---

**Prepared by:**  
Usher  
5.22.25 (updated 5.28.25)
