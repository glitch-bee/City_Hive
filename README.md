# Bee Tree & Swarm Trap Mapping Project

**Goal:**  
Build a tool for NYC beekeepers and stewards to visualize and map bee-friendly trees (“bee trees”) and potential swarm trap locations using public data and club/community input.

---

## Features

- Interactive Leaflet.js map (demo for Staten Island, NYC)
- All mapped locations derived from the NYC Street Tree Census
- Easy visualization of tens of thousands of trees with popups for species, DBH, and address
- Framework for future annotation/tagging by users (e.g., reporting bee trees, swarm trap sites)

---

## How to Use

1. **Clone or download the repo (no large data files included)**
   ```sh
   git clone https://github.com/glitch-bee/bee_tree.git
2. **Add your own GeoJSON data file**

The full dataset (staten_island_trees.geojson) is not tracked here (file too large for GitHub).

You can generate this using the included refine.py script if you have the NYC Tree Census CSV.

3. **Open a local web server in the project directory:**
   python -m http.server 8000

4. Map loads and displays all tree locations for Staten Island (if you have the data).



Project Structure
map.html – Leaflet.js map and JS for viewing GeoJSON data

sorter.py – Python script to filter original tree census CSV for Staten Island

refine.py – Python script to clean and convert CSV to GeoJSON

project_notes.md – High-level plan, goals, and current status

.gitignore – Excludes all .csv and .geojson files from version control

Data Notes
NYC Tree Census 2015:
Official data download here

Data files (*.csv, *.geojson) are not included due to size

If you want sample data or a demo subset, reach out or see the scripts for generating a filtered/test file

Roadmap
 Add cluster visualization for better performance

 Enable user tagging/annotations

 Expand to additional boroughs or full NYC

 Build educational content and stewardship guidance

For questions or collaboration, contact glitch-beez@gmail.com
