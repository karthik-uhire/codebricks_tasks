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
```

---

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
