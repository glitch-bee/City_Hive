# Project Notes (City_Hive – Open Beta)

## Current Features
- NYC tree census (all boroughs, including Staten Island) loaded and clustered by species
- Add, edit, and delete user markers (Hive, Swarm, Tree, Structure) with custom icons
- Crosshair "Add New Sighting" mode for precise marker placement (mobile and desktop)
- **Photo upload to Firebase** with <5MB size limit, fully integrated in marker form
- Import/export all user markers (as JSON), supporting backup and sharing between devices
- Markers have optional notes, names, timestamps, and "show radius" toggle
- All user annotations persist in browser localStorage
- Filtering markers by type (Hive, Swarm, Tree, Structure) with checkboxes
- Mobile-friendly, touch-optimized controls and pop-out legend
- Help/instructions modal; accessible UI
- Branded UI and custom map controls
- Clustered markers (no cluster-zoom on click, only zoom level)
- Optional: run with or without Firebase (photo upload only requires it)

## Planning Summary / Near-term Goals
- **Core:** Fix cloud save/sync (Firebase Firestore CRUD for user markers is broken—see issues below)
- Add ability to comment on any marker (club or personal)
- Add auto-delete for inactive/old pins (e.g., swarm locations after N days)
- Improve UI for commenting, legend, and marker editing
- Feedback collection from beta testers (focus on beekeepers and field users)

## Known Issues & Lessons Learned
- **Cloud save is not working:** Firestore returns 400 errors on CRUD ops despite valid config/rules
- **Sync required:** App only stores user markers locally; no cross-device sync yet
- No commenting on pins (planned but not implemented)
- Pin auto-deletion (for swarms, old markers, etc.) not implemented yet
- General: occasional UI inconsistencies on mobile; some minor display bugs
- Photo upload works via Firebase Storage, but only if online

## Contact
For questions, feature requests, or collaboration, reach out via the NY Bee Club (**pres.qns@nybeeclub.org**).
