# City_Hive

City_Hive is a lightweight mapping tool for beekeepers, researchers and land stewards in New York City. It lets you log hive locations, swarms, cavity trees and other bee-related sites directly in the browser. No server is required &mdash; markers are stored locally so you can use the map offline on your phone or laptop.

## Key Features

- **Add and Edit Markers** – place a marker using the `+ Add New Sighting` button and crosshair. Edit or delete any of your markers later.
- **Import/Export** – download your markers as JSON and load them again on another device.
- **Photo Uploads** – attach a photo (up to 5&nbsp;MB) to a marker. Images are stored in Firebase.
- **Filtering** – show or hide markers by type (Hive, Swarm, Tree, Structure) via checkboxes.
- **Mobile-Friendly Controls** – gradient-styled buttons with a collapsible menu on small screens, plus a pop‑out legend and a "Locate me" tool for field use.
- **Local Persistence** – all data is saved in `localStorage` so your notes remain even without a network connection.

## Installation

1. Clone the repository and install the Python dependencies if you plan to run the data-prep scripts:
   ```bash
   pip install pandas geopandas requests geojson shapely matplotlib
   ```
2. To simply use the map, open `docs/index.html` in a browser. A small web server such as `python -m http.server` is recommended for mobile devices.
3. Optional: run the scripts in `scripts/` to generate your own GeoJSON files from NYC Open Data.

## Usage

- **Open the map** – navigate to `docs/index.html` in your browser.
- **Add a marker** – click `+ Add New Sighting`, move the map so the crosshair is over the location, then press **Place Here**. Fill out the form and hit **Save**.
- **Edit/Delete** – click an existing marker and choose **Edit** or **Delete** from the popup.
- **Import/Export** – use the **Export Markers** and **Import Markers** buttons to transfer your saved points.

## FAQ

- **Where are my markers stored?**  They are saved in your browser's `localStorage` under `userTrees`. Clearing site data will remove them.
- **My markers disappeared on another device.**  Export them to a file from the original device and import on the new one. There is no automatic sync yet.
- **Photo upload fails.**  Ensure the image is under 5&nbsp;MB and you have a network connection for Firebase storage.

## Contact

Questions or bug reports? Reach out via the NY Bee Club or open an issue on GitHub.

_Last updated: 2025‑06‑01_
