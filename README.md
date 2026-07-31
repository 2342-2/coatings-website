# Maridadi Coatings — website + colour search

**Stack:** React + Tailwind CSS (Vite) frontend, Node.js + SQLite backend.

## Deploying so a stakeholder can view it

The fastest reliable path is **Render** (free tier, no credit card needed
for this size of app). A `render.yaml` blueprint is already in this repo
so both pieces — the API and the website — deploy together in one step.

### 1. Push this project to GitHub

```bash
cd maridadi-react
git init
git add .
git commit -m "Maridadi Coatings site"
```
Create an empty repo on GitHub (github.com → New repository), then:
```bash
git remote add origin https://github.com/<your-username>/maridadi-coatings.git
git branch -M main
git push -u origin main
```

### 2. Deploy on Render

1. Go to [render.com](https://render.com) and sign up / log in (GitHub login is fastest).
2. Click **New +** → **Blueprint**.
3. Connect the GitHub repo you just pushed.
4. Render will detect `render.yaml` and show two services:
   - `maridadi-api` (the Node/SQLite backend)
   - `maridadi-client` (the React/Tailwind website)
5. Click **Apply**. First deploy takes a few minutes (client runs `npm install && npm run build`).

Once both are live, your stakeholder link is:
```
https://maridadi-client.onrender.com
```
(Render may append a short random suffix if that exact name is taken — the
dashboard will show you the real URL either way.)

**Free tier note:** free services spin down after 15 minutes of no
traffic and take ~30–60 seconds to wake back up on the next visit. Fine
for a stakeholder review link; if you want it always-instant, upgrade
`maridadi-api` to a paid instance later.

### Alternative: a quick temporary link (no hosting setup)

If you just want something to share in the next five minutes rather than
a persistent URL, run the app locally and tunnel it:

```bash
# Terminal 1
cd server && node server.js

# Terminal 2
cd client && npm install && npm run dev

# Terminal 3 — exposes your local Vite server publicly
npx cloudflared tunnel --url http://localhost:5173
```
That prints a temporary `https://*.trycloudflare.com` URL you can share.
It only works while your machine and `npm run dev` are running, and the
color search calls will only work if the client's `/api` proxy is also
reachable — for a real shareable link, the Render path above is the
better choice for anything beyond a same-call demo.

## Project structure

```
maridadi-react/
├── render.yaml            # Render Blueprint — deploys both services
├── server/                 # Node.js API (zero npm dependencies)
│   ├── server.js
│   ├── package.json
│   ├── data/paint.db         # SQLite database (generated — see below)
│   └── scripts/build_db.py    # rebuilds paint.db from an .xlsx export
└── client/                # React + Tailwind (Vite)
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx, App.jsx, api.js, index.css
        └── components/ (Header, Hero, ColorSearch, ColorDetailModal,
                          Products, About, Contact, Footer)
```

## Running it locally

**Terminal 1 — API:**
```bash
cd server
node server.js          # http://localhost:3001, Node 22.5+, zero installs
```

**Terminal 2 — website:**
```bash
cd client
npm install
npm run dev              # http://localhost:5173
```

## Updating the colour database

```bash
pip install pandas openpyxl
python3 server/scripts/build_db.py /path/to/new_export.xlsx
```
Rebuilds `server/data/paint.db`. Restart the API afterwards. If you're
deploying on Render, commit the updated `paint.db` and push — Render
redeploys automatically on push to `main`.

## What's real vs. placeholder

- **Colour search is real** — 14,421 colours, 69,373 tint formulas, from
  your actual data.
- **About text and contact details are placeholders** — edit
  `client/src/components/About.jsx` and `Contact.jsx`.
- **The contact form doesn't send anywhere yet** — shows a confirmation
  only. Wire it to a form service (Formspree, Web3Forms) or add a
  `/api/contact` route to `server/server.js`.
- **No logo yet** — header uses a text wordmark + gradient dot.
# coatings-website
