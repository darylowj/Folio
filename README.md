# Folio PDF

A private PDF editor that runs entirely in your browser. Files never leave your device.

**Features:** view, zoom and search · highlight, draw, text boxes and comments · saved signatures and company stamps (with background removal, backup and restore) · fill forms · add images or stamps · merge, split, reorder, rotate and delete pages · watermark (for example, marking IC copies "For verification by … only") · edit existing text · scan text (OCR) on scans and photos · save as PDF or JPG.

It installs as an app on phone and computer and works offline.

## How it's built
- `index.html` holds the whole app (no build step).
- `vendor/`: [pdf.js](https://github.com/mozilla/pdf.js) 3.11.174 for display, [pdf-lib](https://pdf-lib.js.org) 1.17.1 for editing, [JSZip](https://stuk.github.io/jszip/) 3.10.1 for split downloads.
- `vendor/ocr/`: [Tesseract.js](https://tesseract.projectnaptha.com) 5.1.1 with English and Malay reading data, loaded only when you use Scan text.
- `sw.js` caches the app for offline use. It never stores your documents.

Hosted with GitHub Pages from the `main` branch.

## About Edit text
Edit text covers the original line with a patch in the page's background colour and writes your new text on top, in a matching size, colour and a standard font (sans, serif or mono). It doesn't reflow paragraphs, and the original text is still in the file underneath, so don't rely on it to hide sensitive information.

Current build: 2026.11.27-d65052
