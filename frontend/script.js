/**
 * Recipe Finder — Frontend Application Logic
 */

// Configuration API Base URL
const API_BASE_URL = window.location.origin.includes('5000') || window.location.origin.includes('localhost')
  ? 'http://localhost:5000/api'
  : '/api';

// State Management
const state = {
  recipes: [],
  categories: [],
  ingredients: [],
  selectedCategory: 'All',
  selectedIngredients: [],
  searchText: '',
  debounceTimer: null,
  isLoading: true
};

// Fallback Image URL if recipe image fails
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80';

// DOM Elements
const textSearchInput = document.getElementById('text-search');
const clearSearchBtn = document.getElementById('clear-search-btn');
const categoryPillsContainer = document.getElementById('category-pills');
const ingredientSelect = document.getElementById('ingredient-select');
const selectedIngredientChips = document.getElementById('selected-ingredient-chips');
const clearFiltersBtn = document.getElementById('clear-filters-btn');
const resultsCountEl = document.getElementById('results-count');

const skeletonGrid = document.getElementById('skeleton-grid');
const recipeGrid = document.getElementById('recipe-grid');
const emptyState = document.getElementById('empty-state');
const emptyClearBtn = document.getElementById('empty-clear-btn');

// Modal Elements
const recipeModal = document.getElementById('recipe-modal');
const modalCloseBtn = document.getElementById('modal-close-btn');
const modalImg = document.getElementById('modal-img');
const modalCategory = document.getElementById('modal-category');
const modalTitle = document.getElementById('modal-title');
const modalPrepTime = document.getElementById('modal-prep-time');
const modalCookTime = document.getElementById('modal-cook-time');
const modalServings = document.getElementById('modal-servings');
const modalDifficulty = document.getElementById('modal-difficulty');
const modalDescription = document.getElementById('modal-description');
const modalIngredientsList = document.getElementById('modal-ingredients-list');
const modalInstructionsList = document.getElementById('modal-instructions-list');
const brandLogo = document.getElementById('brand-logo');

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  initApp();
  setupEventListeners();
});

async function initApp() {
  setLoading(true);
  try {
    await Promise.all([
      fetchCategories(),
      fetchIngredients(),
      fetchRecipes()
    ]);
  } catch (error) {
    console.error('Error initializing Recipe Finder app:', error);
  } finally {
    setLoading(false);
  }
}

// Set Loading UI State
function setLoading(loading) {
  state.isLoading = loading;
  if (loading) {
    skeletonGrid.classList.remove('hidden');
    recipeGrid.classList.add('hidden');
    emptyState.classList.add('hidden');
  } else {
    skeletonGrid.classList.add('hidden');
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Text Search with 250ms Debounce
  textSearchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    clearSearchBtn.classList.toggle('hidden', !value);

    clearTimeout(state.debounceTimer);
    state.debounceTimer = setTimeout(() => {
      state.searchText = value;
      fetchRecipes();
    }, 250);
  });

  // Clear Search Text Button
  clearSearchBtn.addEventListener('click', () => {
    textSearchInput.value = '';
    state.searchText = '';
    clearSearchBtn.classList.add('hidden');
    fetchRecipes();
  });

  // Ingredient Select Change
  ingredientSelect.addEventListener('change', (e) => {
    const selected = e.target.value;
    if (selected && !state.selectedIngredients.includes(selected)) {
      state.selectedIngredients.push(selected);
      renderIngredientChips();
      ingredientSelect.value = '';
      fetchRecipes();
    }
  });

  // Clear All Filters
  clearFiltersBtn.addEventListener('click', resetAllFilters);
  emptyClearBtn.addEventListener('click', resetAllFilters);
  brandLogo.addEventListener('click', (e) => {
    e.preventDefault();
    resetAllFilters();
  });

  // Modal Close Events
  modalCloseBtn.addEventListener('click', closeModal);
  recipeModal.addEventListener('click', (e) => {
    if (e.target === recipeModal) {
      closeModal();
    }
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !recipeModal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

// Reset All Filters
function resetAllFilters() {
  state.searchText = '';
  state.selectedCategory = 'All';
  state.selectedIngredients = [];

  textSearchInput.value = '';
  clearSearchBtn.classList.add('hidden');
  ingredientSelect.value = '';

  updateActiveCategoryPill();
  renderIngredientChips();
  fetchRecipes();
}

// Fetch Categories from API
async function fetchCategories() {
  try {
    const response = await fetch(`${API_BASE_URL}/categories`);
    if (!response.ok) throw new Error('Failed to fetch categories');
    state.categories = await response.json();
    renderCategoryPills();
  } catch (error) {
    console.error('Error fetching categories:', error);
  }
}

// Render Category Filter Pills
function renderCategoryPills() {
  const allCategories = ['All', ...state.categories];
  categoryPillsContainer.innerHTML = '';

  allCategories.forEach(cat => {
    const pill = document.createElement('button');
    pill.type = 'button';
    pill.className = `pill-btn ${state.selectedCategory === cat ? 'active' : ''}`;
    pill.dataset.category = cat;
    pill.textContent = cat;

    pill.addEventListener('click', () => {
      state.selectedCategory = cat;
      updateActiveCategoryPill();
      fetchRecipes();
    });

    categoryPillsContainer.appendChild(pill);
  });
}

function updateActiveCategoryPill() {
  const pills = categoryPillsContainer.querySelectorAll('.pill-btn');
  pills.forEach(pill => {
    pill.classList.toggle('active', pill.dataset.category === state.selectedCategory);
  });
}

// Fetch Ingredients from API
async function fetchIngredients() {
  try {
    const response = await fetch(`${API_BASE_URL}/ingredients`);
    if (!response.ok) throw new Error('Failed to fetch ingredients');
    state.ingredients = await response.json();
    renderIngredientsDropdown();
  } catch (error) {
    console.error('Error fetching ingredients:', error);
  }
}

// Render Ingredients Dropdown
function renderIngredientsDropdown() {
  ingredientSelect.innerHTML = '<option value="">-- Choose an ingredient --</option>';
  state.ingredients.forEach(ing => {
    const option = document.createElement('option');
    option.value = ing;
    option.textContent = ing;
    ingredientSelect.appendChild(option);
  });
}

// Render Selected Ingredient Chips
function renderIngredientChips() {
  selectedIngredientChips.innerHTML = '';

  if (state.selectedIngredients.length === 0) {
    selectedIngredientChips.innerHTML = '<span class="no-chips-hint">None selected</span>';
    return;
  }

  state.selectedIngredients.forEach(ing => {
    const chip = document.createElement('div');
    chip.className = 'chip-tag';
    chip.innerHTML = `
      <span>${escapeHTML(ing)}</span>
      <button type="button" class="chip-remove-btn" aria-label="Remove ${escapeHTML(ing)}">&times;</button>
    `;

    chip.querySelector('.chip-remove-btn').addEventListener('click', () => {
      state.selectedIngredients = state.selectedIngredients.filter(i => i !== ing);
      renderIngredientChips();
      fetchRecipes();
    });

    selectedIngredientChips.appendChild(chip);
  });
}

// Fetch Recipes with Combinable API Query Parameters
async function fetchRecipes() {
  setLoading(true);
  try {
    const params = new URLSearchParams();

    if (state.searchText.trim()) {
      params.append('search', state.searchText.trim());
    }

    if (state.selectedCategory && state.selectedCategory !== 'All') {
      params.append('category', state.selectedCategory);
    }

    if (state.selectedIngredients.length > 0) {
      params.append('ingredient', state.selectedIngredients.join(','));
    }

    const queryString = params.toString() ? `?${params.toString()}` : '';
    const response = await fetch(`${API_BASE_URL}/recipes${queryString}`);

    if (!response.ok) throw new Error('Failed to fetch recipes');
    state.recipes = await response.json();
    
    renderRecipes();
  } catch (error) {
    console.error('Error fetching recipes:', error);
    state.recipes = [];
    renderRecipes();
  } finally {
    setLoading(false);
  }
}

// Render Recipe Card Grid
function renderRecipes() {
  recipeGrid.innerHTML = '';

  // Update summary count text
  updateResultsSummary();

  if (state.recipes.length === 0) {
    recipeGrid.classList.add('hidden');
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  recipeGrid.classList.remove('hidden');

  state.recipes.forEach(recipe => {
    const card = document.createElement('article');
    card.className = 'recipe-card';
    card.tabIndex = 0;
    card.setAttribute('aria-label', `View ${recipe.title} recipe`);

    // Title with term highlighting if searching
    const titleHTML = highlightText(recipe.title, state.searchText);

    card.innerHTML = `
      <div class="card-img-container">
        <img 
          src="${escapeHTML(recipe.image || FALLBACK_IMAGE)}" 
          alt="${escapeHTML(recipe.title)}" 
          class="card-img" 
          loading="lazy"
          onerror="this.onerror=null; this.src='${FALLBACK_IMAGE}';"
        >
        <span class="badge badge-category ${escapeHTML(recipe.category)}">${escapeHTML(recipe.category)}</span>
      </div>
      <div class="card-body">
        <h3 class="card-title">${titleHTML}</h3>
        <p class="card-desc">${escapeHTML(recipe.description || 'Delicious gourmet recipe prepared with fresh ingredients.')}</p>
        <div class="card-meta-row">
          <div class="meta-info-item">
            <span>⏱️</span>
            <span>${recipe.prepTime + recipe.cookTime} mins</span>
          </div>
          <div class="meta-info-item">
            <span>📊</span>
            <span>${escapeHTML(recipe.difficulty || 'Medium')}</span>
          </div>
          <div class="meta-info-item">
            <span>👥</span>
            <span>${recipe.servings} Servings</span>
          </div>
        </div>
        <button type="button" class="card-view-btn">View Recipe &rarr;</button>
      </div>
    `;

    // Click and Keyboard Event to Open Modal
    card.addEventListener('click', () => openModal(recipe));
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openModal(recipe);
      }
    });

    recipeGrid.appendChild(card);
  });
}

// Highlight Matching Text in Titles
function highlightText(text, search) {
  if (!search || !search.trim()) return escapeHTML(text);
  const regex = new RegExp(`(${escapeRegExp(search.trim())})`, 'gi');
  return escapeHTML(text).replace(regex, '<span class="highlight-term">$1</span>');
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function escapeHTML(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Update Results Summary Bar Text
function updateResultsSummary() {
  const count = state.recipes.length;
  let summary = `Showing ${count} recipe${count === 1 ? '' : 's'}`;

  const filtersActive = [];
  if (state.selectedCategory !== 'All') filtersActive.push(`Category: "${state.selectedCategory}"`);
  if (state.selectedIngredients.length > 0) filtersActive.push(`Ingredients: ${state.selectedIngredients.join(', ')}`);
  if (state.searchText.trim()) filtersActive.push(`Search: "${state.searchText.trim()}"`);

  if (filtersActive.length > 0) {
    summary += ` matching (${filtersActive.join(' • ')})`;
  }

  resultsCountEl.textContent = summary;
}

// Open Recipe Detail Modal
function openModal(recipe) {
  modalImg.src = recipe.image || FALLBACK_IMAGE;
  modalImg.onerror = () => { modalImg.src = FALLBACK_IMAGE; };
  modalImg.alt = recipe.title;

  modalCategory.textContent = recipe.category;
  modalCategory.className = `badge badge-category ${recipe.category}`;
  modalTitle.textContent = recipe.title;

  modalPrepTime.textContent = `${recipe.prepTime || 10} mins`;
  modalCookTime.textContent = `${recipe.cookTime || 15} mins`;
  modalServings.textContent = `${recipe.servings || 2} servings`;
  modalDifficulty.textContent = recipe.difficulty || 'Medium';
  modalDescription.textContent = recipe.description || '';

  // Render Ingredients List
  modalIngredientsList.innerHTML = '';
  if (Array.isArray(recipe.ingredients) && recipe.ingredients.length > 0) {
    recipe.ingredients.forEach(ing => {
      const li = document.createElement('li');
      li.textContent = ing;
      modalIngredientsList.appendChild(li);
    });
  } else {
    modalIngredientsList.innerHTML = '<li>No specific ingredients listed.</li>';
  }

  // Render Instructions List
  modalInstructionsList.innerHTML = '';
  if (Array.isArray(recipe.instructions) && recipe.instructions.length > 0) {
    recipe.instructions.forEach(step => {
      const li = document.createElement('li');
      li.textContent = step;
      modalInstructionsList.appendChild(li);
    });
  } else {
    modalInstructionsList.innerHTML = '<li>Follow standard preparation methods for this dish.</li>';
  }

  recipeModal.classList.remove('hidden');
  recipeModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close Modal
function closeModal() {
  recipeModal.classList.add('hidden');
  recipeModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}
