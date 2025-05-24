# Bee Tree Project

## Overview
This project processes and analyzes NYC 2015 Street Tree Census data to identify trees in Staten Island that are suitable for Italian honeybee habitats, based on tree diameter at breast height (DBH). The project also aims to build a tool for NYC beekeepers and stewards to visualize and map bee-friendly trees (“bee trees”) and potential swarm trap locations using public data and club/community input.

## Folder Structure
```
bee_tree/
├── data/
│   ├── raw/
│   │   └── 2015_Street_Tree_Census_-_Tree_Data_20250522.csv
│   ├── processed/
│   │   ├── bronx_trees.csv
│   │   ├── bronx_trees.geojson
│   │   ├── bronx_trees_filtered.geojson
│   │   ├── brooklyn_trees.csv
│   │   ├── brooklyn_trees.geojson
│   │   ├── brooklyn_trees_filtered.geojson
│   │   ├── manhattan_trees.csv
│   │   ├── manhattan_trees.geojson
│   │   ├── manhattan_trees_filtered.geojson
│   │   ├── queens_trees.csv
│   │   ├── queens_trees.geojson
│   │   ├── queens_trees_filtered.geojson
│   │   ├── staten_island_trees.csv
│   │   ├── staten_island_trees.geojson
│   │   ├── staten_island_trees_filtered.geojson
│   │   └── full_boro_filtered.geojson
├── docs/
│   ├── StreetTreeCensus2015TreesDataDictionary20161102.pdf
│   └── Bee Tree .txt
├── scripts/
│   ├── merge_filtered.py
│   ├── sorter.py
│   ├── refine.py
│   └── refineDBH.py
├── map.html
└── project_notes.md
```

## Workflow
1. **Split by Borough**  
   Run `scripts/sorter.py` to extract trees for each borough from the full census CSV:
   - Input: `data/raw/2015_Street_Tree_Census_-_Tree_Data_20250522.csv`
   - Output: `data/processed/bronx_trees.csv`, `brooklyn_trees.csv`, `manhattan_trees.csv`, `queens_trees.csv`, `staten_island_trees.csv`

2. **Convert to GeoJSON**  
   Run `scripts/refine.py` to clean each borough CSV and convert it to GeoJSON:
   - Input: `data/processed/<borough>_trees.csv`
   - Output: `data/processed/<borough>_trees.geojson`

3. **Filter by Tree Diameter (DBH)**  
   Run `scripts/refineDBH.py` to filter each borough's GeoJSON by DBH (default: 35–80 cm):
   - Input: `data/processed/<borough>_trees.geojson`
   - Output: `data/processed/<borough>_trees_filtered.geojson`

4. **Merge All Filtered Boroughs**  
   Run `scripts/merge_filtered.py` to combine all filtered borough GeoJSONs into one:
   - Input: All `data/processed/<borough>_trees_filtered.geojson`
   - Output: `data/processed/full_boro_filtered.geojson`

5. **View on Map**  
   Start a local web server and open `map.html` to view all filtered trees together:
   - `python -m http.server 8000`
   - Open [http://localhost:8000/map.html](http://localhost:8000/map.html)

## Requirements
- Python 3.x
- pandas
- numpy
- geojson
- geopandas

Install dependencies with:
```
pip install pandas numpy geojson geopandas
```

## Documentation
- See `docs/StreetTreeCensus2015TreesDataDictionary20161102.pdf` for data dictionary.
- See `docs/Bee Tree .txt` for bee habitat notes.

## Notes
- All scripts assume they are run from the `scripts/` directory.
- Adjust DBH range in `refineDBH.py` as needed for your research.

---

## Features

- Interactive Leaflet.js map (now supports all filtered boroughs, not just Staten Island)
- All mapped locations derived from the NYC Street Tree Census
- Easy visualization of tens of thousands of trees with popups for species, DBH, and address
- Merged view of all boroughs for citywide analysis
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

4. Map loads and displays all tree locations for all filtered boroughs (if you have the data in `full_boro_filtered.geojson`).



For questions or collaboration, contact glitch-beez@gmail.com
