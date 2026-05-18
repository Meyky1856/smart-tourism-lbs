# Smart Tourism LBS — Pulau Penyengat

A **Location-Based Service (LBS)** tourism website for Pulau Penyengat, built with **React + Vite** (frontend) and **Express.js** (backend). Features an interactive Leaflet/OpenStreetMap map, A\* route recommendation, and an AI Assistant powered by Google Gemini with manual RAG.

---

## Features

- Interactive map with Leaflet + OpenStreetMap embedded in the hero section
- Destination search and place recommendations
- A\* route planning between destinations
- AI Chat Assistant (Gemini 2.5 Flash) with a knowledge base about Pulau Penyengat
- Sections: About, Malay Culture, Tourist Destinations, Local Cuisine, Gallery, Contact
- All images use local SVG assets — no external image dependencies

---

## Tech Stack

| Layer    | Technology                                   |
| -------- | -------------------------------------------- |
| Frontend | React 18, Vite 5, Leaflet 1.9                |
| Backend  | Node.js 22, Express 4, Google Generative AI  |
| AI       | Gemini 2.5 Flash + manual RAG                |
| Map      | Leaflet.js + OpenStreetMap (no Google Maps)  |

---

## Prerequisites

- **Node.js LTS v22** (recommended — see `.nvmrc`)
- **npm** (comes with Node.js)
- A **Google Gemini API key** — get one at [Google AI Studio](https://aistudio.google.com/)

> If you use [nvm](https://github.com/nvm-sh/nvm), run `nvm use` inside the project root to automatically switch to Node 22.

---

## Project Structure

```
smart-tourism-lbs/
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── services/       # AI service & RAG service
│   │   └── data/
│   │       └── knowledge-base/   # destinations.json, culture.json, faq.json
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/     # Navbar, HeroSection, sections, ChatWidget, etc.
│   │   ├── data/           # destinations.js, culture.js, routeGraph.js
│   │   ├── services/
│   │   ├── styles/
│   │   └── utils/          # astar.js
│   ├── public/images/      # Local SVG assets
│   ├── .env.example
│   └── package.json
└── docs/
```

---

## Installation

> **Important:** If you have an older version of this project, **do not extract this zip on top of the old folder**. Rename or delete the old `smart-tourism-lbs` folder first, then extract fresh.

### 1. Clone or Extract the Project

```bash
# If using Git
git clone <repository-url>
cd smart-tourism-lbs

# Or extract the ZIP and enter the folder
unzip smart-tourism-lbs.zip
cd smart-tourism-lbs
```

---

### 2. Set Up the Backend

```bash
cd backend
```

**Install dependencies:**

```bash
# Recommended — uses the provided package-lock.json for reproducible installs
npm ci --no-audit --no-fund
```

> If you encounter slow or stuck installs, set the registry explicitly first:
> ```bash
> npm config set registry https://registry.npmjs.org/
> npm ci --no-audit --no-fund
> ```

**Configure environment variables:**

```bash
cp .env.example .env
```

Open `backend/.env` and fill in your Gemini API key:

```env
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
```

> Never commit your real API key to Git or share it publicly.

**Start the backend:**

```bash
npm run dev
```

Backend will run at: `http://localhost:5000`

---

### 3. Set Up the Frontend

Open a **new terminal**, then:

```bash
cd frontend
```

**Install dependencies:**

```bash
npm ci --no-audit --no-fund
```

**Configure environment variables:**

```bash
cp .env.example .env
```

The default `.env` content:

```env
VITE_API_URL=http://localhost:5000
```

**Start the frontend:**

```bash
npm run dev
```

Frontend will run at: `http://localhost:3000`

---

## Quick Reference

| Command                         | Description                        |
| ------------------------------- | ---------------------------------- |
| `npm ci --no-audit --no-fund`   | Clean install from lock file       |
| `npm run dev`                   | Start development server           |
| `npm run build`                 | Build frontend for production      |
| `npm run start`                 | Start backend in production mode   |

---

## Troubleshooting

**`npm install` takes too long or hangs**
Use `npm ci` instead — it reads directly from the provided `package-lock.json`. If it still stalls, run:
```bash
npm config set registry https://registry.npmjs.org/
rm -rf node_modules
npm ci --no-audit --no-fund
```

**Port 5000 is already in use**
Change `PORT` in `backend/.env` to another port (e.g., `5001`), then update `VITE_API_URL` in `frontend/.env` to match:
```env
VITE_API_URL=http://localhost:5001
```

**Clean reinstall (if issues persist)**
```bash
# Backend
cd backend
rm -rf node_modules
npm ci --no-audit --no-fund

# Frontend
cd ../frontend
rm -rf node_modules
npm ci --no-audit --no-fund
```

---

## API Endpoints

| Method | Endpoint              | Description                  |
| ------ | --------------------- | ---------------------------- |
| GET    | `/api/health`         | Health check & model info    |
| POST   | `/api/chat`           | Send message to AI assistant |
| GET    | `/api/destinations`   | Get list of destinations     |

---

## Notes

- The A\* route graph uses manually defined nodes and edges in `frontend/src/data/routeGraph.js`. For accurate routing, nodes should be calibrated against actual paths on Pulau Penyengat.
- All card images use local SVG files in `frontend/public/images/` — the app works fully offline without external image CDNs.
- The AI assistant uses a manual RAG implementation with knowledge base files in `backend/src/data/knowledge-base/`.
