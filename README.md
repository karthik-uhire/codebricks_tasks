<<<<<<< HEAD
# 🍳 Recipe Finder

A responsive, modern full-stack web application to search, filter, and discover delicious recipes by ingredients, categories, and keywords.

![Recipe Finder](https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

- **Responsive Card Grid:** Dynamic CSS Grid layout supporting 4 columns on desktop down to 1 column on mobile (tested down to 320px width).
- **Combinable Filtering (AND Logic):** Combine text search, category filters (Breakfast, Lunch, Dinner, Dessert, Snack, Vegan), and multi-select ingredient chips simultaneously.
- **Debounced Search:** Live text filtering with a 250ms input debounce for seamless performance.
- **Recipe Detail Modal:** View complete ingredient lists, step-by-step cooking instructions, prep/cook times, servings, and difficulty levels.
- **Search Term Highlighting:** Matching search queries are visually highlighted in recipe titles.
- **Polished UX & Micro-interactions:** Card lift hover animations, image zoom inside clipped containers, custom skeleton loaders, empty state message, keyboard accessibility focus indicators, and `prefers-reduced-motion` compliance.

---

## 📁 Tech Stack & Project Structure

```
Recipe Finder UI/
├── backend/
│   ├── data/
│   │   ├── recipes.json     # Sample database with 16 rich recipes
│   │   └── seed.js          # Seed validation script
│   ├── routes/
│   │   └── recipes.js       # REST API endpoints & filter logic
│   ├── .env                 # Environment variables
│   ├── .env.example         # Template environment variables
│   ├── package.json         # Node.js dependencies
│   └── server.js            # Express server entry point
├── frontend/
│   ├── index.html           # Semantic HTML5 layout
│   ├── styles.css           # Vanilla CSS design system & grid layout
│   └── script.js            # Frontend state, API integration, modal logic
└── README.md
```

---

## 🚀 Quick Start & Setup Instructions

### 1. Start the Backend API

```bash
cd backend
npm install
npm run seed      # Validate sample recipe database
npm run dev        # Starts REST API at http://localhost:5000
```

### 2. Launch the Frontend

Option A: Open `frontend/index.html` directly in any web browser.

Option B: Serve via `npx serve` or Live Server:
```bash
cd frontend
npx serve .
=======
# ⛅ Atmosphere — Modern Weather Dashboard

A responsive, single-page **Weather Dashboard** web application powered by HTML5, Vanilla CSS3 (with glassmorphism, dynamic ambient backgrounds, fluid typography, and micro-animations), Vanilla JavaScript (ES6+), and the keyless **Open-Meteo Weather & Geocoding API**.

---

## ✨ Features

- **Live City Search & Auto-Suggestions**: Instant geocoding via Open-Meteo API with debounced city suggestions dropdown and search-on-Enter.
- **GPS Location**: "Use My Location" button leveraging the browser Geolocation API.
- **Current Weather Hero Panel**:
  - City name, country, date/time derived from timezone.
  - Large temperature reading with instant °C / °F toggle (converted client-side without refetching).
  - Animated crisp SVG weather icons.
  - Secondary details: feels-like temp, humidity, wind speed, UV index, air pressure.
- **24-Hour Hourly Timeline**: Scrollable horizontal track showing time, weather icon, temperature, and rain probability.
- **7-Day Daily Forecast**: Responsive card grid displaying day of week, weather icon, condition, and min/max temperature visual bar.
- **Dynamic Atmospheric Backgrounds**: Ambient theme shifts automatically based on weather conditions (Sunny, Clear Night, Rain, Storm, Snow, Fog, Overcast).
- **In-Memory Caching**: Caches previously searched cities in memory so repeat searches in the same session load instantly.
- **Recent Search Chips**: Clickable recent search pills for quick access.
- **Full UI State Handling**:
  - **Initial / Empty State**: Prompt card with quick-select global city chips (Tokyo, London, New York, Paris, Sydney, Reykjavik).
  - **Loading State**: Skeleton loading UI with shimmer effect.
  - **Error State**: Friendly error message with retry button.

---

## 🚀 Quickstart

No build steps or npm installations are required!

### Option 1: Direct File Opening
Double-click `index.html` in your browser.

### Option 2: Serve Locally via Node/Python
```bash
# Using npx serve:
npx serve .

# Or using Python:
python -m http.server 8000
```
Then open `http://localhost:8000` (or `http://localhost:3000`) in your web browser.

---

## 📁 Project Structure

```
Weather Dashboard UI/
├── index.html     # Semantic HTML5 layout & skeleton loaders
├── styles.css     # CSS custom properties, glassmorphic design, dynamic themes & layout
├── script.js     # WMO code mapping, Open-Meteo API, state machine & unit conversion
└── README.md      # Documentation & quickstart
>>>>>>> b65fd7293aa40e4bace03da514913eb13105c403
```

---

<<<<<<< HEAD
## 🔌 API Endpoints Summary

| Method | Route | Description |
|---|---|---|
| GET | `/api/recipes` | Fetch all recipes. Supports `?search=`, `?category=`, `?ingredient=` |
| GET | `/api/recipes/:id` | Fetch single recipe details by ID |
| GET | `/api/categories` | Fetch list of distinct categories |
| GET | `/api/ingredients` | Fetch list of distinct ingredients for multi-select |
| POST | `/api/recipes` | Add a new recipe |
| PUT | `/api/recipes/:id` | Update an existing recipe |
| DELETE | `/api/recipes/:id` | Delete a recipe |

---

## 🎨 Design System

- **Primary Accent:** Terracotta `#E07A5F`
- **Secondary Dark:** Slate Charcoal `#3D405B`
- **Typography Pair:** **Outfit** (display titles) + **Inter** (body text)
=======
## 🌐 API Reference

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json`
- **Weather Forecast API**: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&hourly=...&daily=...`
>>>>>>> b65fd7293aa40e4bace03da514913eb13105c403
