Bee Tree NYC
============

Bee Tree is a lightweight browser-based dashboard for mapping feral honey bee sightings and potential nest sites in NYC, visualized alongside urban forestry data.

- Maps wild bee colonies and likely “bee trees” (large cavity trees)
- Uses both local static data and live NYC Street Tree API pulls
- Designed for NY Bee Club, researchers, land stewards, and city agencies

Project Structure
-----------------
bee_tree/
│
├── data/                # Processed and raw data folders (local workflow)
│
├── scripts/             # All Python scripts for data prep, filtering, merging
│   ├── sorter.py
│   ├── refine.py
│   ├── refineDBH.py
│   ├── merge_filtered.py
│   ├── convert_tab.py
│
├── api_map.py           # (Was test.py) Script to pull filtered live data via API
├── api_map.html         # (Was map.html) Demo Leaflet map using API GeoJSON
│
├── project_notes.md     # Ongoing project notes & progress tracker
├── README.md            # This file
│
└── ...

Workflows
---------

1. API-Based Mapping (LIVE DATA)
   - Uses NYC Open Data API to fetch trees matching DBH and species criteria.
   - Outputs a lightweight GeoJSON file (trees_35_80cm.geojson).
   - Visualized in browser using Leaflet in api_map.html.

   To run:
   python api_map.py
   # Outputs: trees_35_80cm.geojson

   # Open api_map.html in a browser to view the map

2. Local Data Processing (STATIC DATA)
   - Start with 2015 Street Tree Census CSV.
   - Scripts for sorting by borough, cleaning, filtering by DBH/species, merging, and converting to GeoJSON.
   - Optionally add NTA boundaries, etc.

   Typical steps:
   python scripts/sorter.py        # Split raw data by borough
   python scripts/refine.py        # Clean/convert to GeoJSON
   python scripts/refineDBH.py     # Filter for likely bee trees
   python scripts/merge_filtered.py# Merge boroughs for citywide
   python scripts/convert_tab.py   # Optional: NTA boundary data

   - Resulting GeoJSON files can be loaded into a Leaflet map.

Dependencies
------------
- Python 3.x
- pandas
- geopandas
- requests
- geojson
- shapely
- matplotlib (for NTA plotting, optional)

Install with:
pip install pandas geopandas requests geojson shapely matplotlib

Roadmap
-------
- [x] Merged all workflows into main
- [x] API-based, lightweight mapping prototype complete
- [ ] Add user annotation, privacy safeguards
- [ ] Pilot testing with NY Bee Club
- [ ] Backend/database for submissions (future)

See project_notes.md for full details.

Contact: Usher (NY Bee Club)
Last updated: 2025-05-30
