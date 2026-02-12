# Data Structures and Algorithms — Visualizations

Step-by-step visualizations with pseudocode for data structures and algorithms. Open the hub, pick a category, then run any visualization with Autoplay or Step by step.

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Structure

- `index.html` — Hub (categories, grid, iframe viewer)
- `css/` — common.css, hub.css
- `js/` — common-viz.js, hub.js
- `pages/` — One HTML per visualization (array, stack, BST, sorts, search, etc.)

Static site. Deploy the whole folder to any static host (e.g. GitHub Pages).
