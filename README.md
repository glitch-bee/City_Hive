<p align="center"><img src="docs/cityhive.png" alt="City_Hive Logo" width="120"/></p>
# City_Hive
## Project Status

City_Hive is now in open beta. The map and sighting markers work across desktop and mobile, including photo uploads and import/export. Try the hosted demo on [Firebase](https://city-hive-90f1e.web.app/). Bug reports and feedback are welcome.

## Live Demo

<https://city-hive-90f1e.web.app/>

City_Hive previously used GitHub Pages for static hosting. We migrated to Firebase Hosting for smoother backend integration and the ability to add real-time features in future updates. The old GitHub Pages site remains available as a legacy mirror.
Legacy site: <https://glitch-bee.github.io/City_Hive/>


City_Hive is a lightweight mapping tool for beekeepers, researchers and land stewards in New York City. It lets you log hive locations, swarms, cavity trees and other bee-related sites directly in the browser. No server is required &mdash; markers are stored locally so you can use the map offline on your phone or laptop.



## Key Features

- **Add and Edit Markers** – use the crosshair to place markers and edit or delete them later.
- **Import/Export** – download your markers as JSON and load them again on another device.
- **Delete All Markers** – remove all your saved markers with one click.
- **Photo Uploads** – attach a photo (up to 5&nbsp;MB) to a marker. Images are stored in Firebase when available.
- **Optional Firebase** – comment out the Firebase scripts and the app still runs; photo upload is simply skipped.
- **Realtime Sync** – when Firebase is enabled, markers sync via Firestore and appear on all clients instantly.
- **Filter by Type** – show or hide markers for Hive, Swarm, Tree or Structure.
- **Help Modal** – quick instructions available from the "?" button.
- **Distinct Icons** – unique icons identify hives, swarms, trees and structures.
- **Mobile-Friendly Controls** – gradient-styled buttons with a collapsible menu on small screens, plus a pop‑out legend and a "Locate me" tool for field use.
- **Cloud Persistence** – markers are stored in Firestore and sync across devices.
- **Accessible UI** – keyboard-friendly controls with ARIA labels and clear hover states.

## Installation

1. Clone the repository and install the Python dependencies if you plan to run the data-prep scripts:
   ```bash
   pip install pandas geopandas requests geojson shapely matplotlib
   ```
2. To simply use the map, open `docs/index.html` in a browser or visit the hosted site at <https://city-hive-90f1e.web.app/>. A small web server such as `python -m http.server` is recommended for mobile devices.
3. Optional: run the scripts in `scripts/` to generate your own GeoJSON files from NYC Open Data.

## Deployment

Prerequisites: [Node.js](https://nodejs.org/), npm and the [Firebase CLI](https://firebase.google.com/docs/cli).

1. `firebase login`
2. `firebase init hosting` &mdash; select **docs** as the public directory and **do not** overwrite `index.html`.
3. `firebase serve` to test locally.
4. `firebase deploy` to publish your site.

The live site is available at <https://city-hive-90f1e.web.app/> once deployed.

## API Key Setup

City_Hive uses Firebase Storage for photo uploads. The public demo includes
`docs/firebaseConfig.js` with a limited API key. If you deploy your own copy,
replace that file with your own Firebase config and ensure your Storage rules
restrict writes to authenticated users.
Enable Firestore in your Firebase project to use the new realtime marker sync. Anonymous auth is sufficient.
If you prefer not to use Firebase, simply comment out the Firebase scripts in `docs/index.html` and the app will skip photo uploads.

## Usage

- **Open the map** – navigate to `docs/index.html` in your browser.
- **Add a marker** – click `+ Add New Sighting`, move the map so the crosshair is over the location, then press **Place Here**. Fill out the form and hit **Save**.
- **Edit/Delete** – click an existing marker and choose **Edit** or **Delete** from the popup.
- **Import/Export** – use the **Export Markers** and **Import Markers** buttons to transfer your saved points.
- **Delete All** – use the "Delete All My Markers" button to clear your data.
- **Filter Markers** – toggle types on or off using the filter button.
- **Help Button** – tap "?" for quick instructions.

## FAQ

- **Where are my markers stored?**  They live in Firestore under your user ID, so you can access them on any device.
- **My markers disappeared on another device.**  Markers are stored in Firestore and appear anywhere you sign in. Offline devices can still export and import manually.
- **Photo upload fails.**  Ensure the image is under 5&nbsp;MB and you have a network connection for Firebase storage.
- **Can I run without Firebase?**  Yes. Comment out the Firebase scripts and the app will still work; photo uploads will simply be disabled.

## Contact

Questions or bug reports? Reach out via the NY Bee Club ( pres.qns@nybeeclub.org ) or open an issue on GitHub.

_Last updated: 2025-06-05_
