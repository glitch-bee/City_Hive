/**
 * Placeholder for shared utilities.
 * Exports a flag indicating if Firebase is available.
 */
const firebaseEnabled = typeof firebase !== 'undefined';
window.firebaseEnabled = firebaseEnabled;
