# Folio PDF

A private PDF editor that runs entirely in your browser. Files never leave your device.

**Features:** view, zoom and search · highlight, draw, text boxes and comments · signatures · fill forms · add images or stamps · merge, split, reorder, rotate and delete pages · watermark (for example, marking IC copies "For verification by … only") · save as PDF or JPG.

It installs as an app on phone and computer and works offline.

## How it's built
- `index.html` holds the whole app (no build step).
- `vendor/`: [pdf.js](https://github.com/mozilla/pdf.js) 3.11.174 for display, [pdf-lib](https://pdf-lib.js.org) 1.17.1 for editing, [JSZip](https://stuk.github.io/jszip/) 3.10.1 for split downloads.
- `sw.js` caches the app for offline use. It never stores your documents.

Hosted with GitHub Pages from the `main` branch.
