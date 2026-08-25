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
```

---

## 🌐 API Reference

- **Geocoding API**: `https://geocoding-api.open-meteo.com/v1/search?name={city}&count=5&language=en&format=json`
- **Weather Forecast API**: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=...&hourly=...&daily=...`
