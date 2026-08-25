const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('crypto');

const dataPath = path.join(__dirname, '..', 'data', 'recipes.json');

// Helper to read recipes
function readRecipes() {
  try {
    const data = fs.readFileSync(dataPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// Helper to write recipes
function writeRecipes(recipes) {
  fs.writeFileSync(dataPath, JSON.stringify(recipes, null, 2), 'utf-8');
}

// GET /api/categories - Get list of distinct categories
router.get('/categories', (req, res) => {
  try {
    const recipes = readRecipes();
    const categoriesSet = new Set(recipes.map(r => r.category).filter(Boolean));
    const categories = Array.from(categoriesSet).sort();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
});

// GET /api/ingredients - Get list of distinct ingredients
router.get('/ingredients', (req, res) => {
  try {
    const recipes = readRecipes();
    const ingredientsSet = new Set();

    recipes.forEach(recipe => {
      if (Array.isArray(recipe.ingredients)) {
        recipe.ingredients.forEach(item => {
          // Clean ingredient string to get core ingredient names
          const cleanItem = item.replace(/^[\d\s\/\.\-\(\)\w]*?(of|cup|cups|tbsp|tsp|lb|lbs|oz|g|kg|can|cans|slice|slices|clove|cloves|head|bunch|pinch|small|medium|large|fresh|ripe|cooked|frozen|sliced|diced|chopped|minced|grated|crushed|melted|peeled|drained|rinsed)+\s+/i, '').trim();
          if (cleanItem.length > 2) {
            ingredientsSet.add(cleanItem.toLowerCase());
          }
        });
      }
    });

    const ingredients = Array.from(ingredientsSet)
      .map(i => i.charAt(0).toUpperCase() + i.slice(1))
      .sort();

    res.json(ingredients);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve ingredients' });
  }
});

// GET /api/recipes - Get all recipes with search, category, and ingredient filters
router.get('/', (req, res) => {
  try {
    const { search, category, ingredient } = req.query;
    let recipes = readRecipes();

    // Text search (matches title or ingredients)
    if (search && search.trim() !== '') {
      const query = search.trim().toLowerCase();
      recipes = recipes.filter(r => {
        const titleMatch = r.title && r.title.toLowerCase().includes(query);
        const ingredientMatch = Array.isArray(r.ingredients) && r.ingredients.some(ing => ing.toLowerCase().includes(query));
        const descMatch = r.description && r.description.toLowerCase().includes(query);
        return titleMatch || ingredientMatch || descMatch;
      });
    }

    // Category filter (exact match, case-insensitive)
    if (category && category.trim() !== '' && category.toLowerCase() !== 'all') {
      const catQuery = category.trim().toLowerCase();
      recipes = recipes.filter(r => r.category && r.category.toLowerCase() === catQuery);
    }

    // Ingredient filter (can be comma-separated or single string)
    if (ingredient && ingredient.trim() !== '') {
      const selectedIngredients = ingredient.split(',').map(i => i.trim().toLowerCase()).filter(Boolean);
      recipes = recipes.filter(r => {
        if (!Array.isArray(r.ingredients)) return false;
        const recipeIngsLower = r.ingredients.map(ing => ing.toLowerCase());
        // All selected ingredients must be present in the recipe (AND logic)
        return selectedIngredients.every(selectedIng =>
          recipeIngsLower.some(recipeIng => recipeIng.includes(selectedIng))
        );
      });
    }

    res.json(recipes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipes' });
  }
});

// GET /api/recipes/:id - Get a single recipe
router.get('/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const recipe = recipes.find(r => r.id === req.params.id);

    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    res.json(recipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve recipe' });
  }
});

// POST /api/recipes - Add a new recipe
router.post('/', (req, res) => {
  try {
    const { title, category, image, description, ingredients, instructions, prepTime, cookTime, servings, difficulty } = req.body;

    if (!title || !category) {
      return res.status(400).json({ error: 'Title and category are required' });
    }

    const recipes = readRecipes();
    const newRecipe = {
      id: (Math.random().toString(36).substring(2, 9) + Date.now().toString(36)),
      title: title.trim(),
      category: category.trim(),
      image: image || 'https://images.unsplash.com/photo-1495521821757-a1efb6729352?auto=format&fit=crop&w=800&q=80',
      description: description || '',
      ingredients: Array.isArray(ingredients) ? ingredients : [],
      instructions: Array.isArray(instructions) ? instructions : [],
      prepTime: Number(prepTime) || 10,
      cookTime: Number(cookTime) || 15,
      servings: Number(servings) || 2,
      difficulty: difficulty || 'Medium'
    };

    recipes.unshift(newRecipe);
    writeRecipes(recipes);

    res.status(201).json(newRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create recipe' });
  }
});

// PUT /api/recipes/:id - Update a recipe
router.put('/:id', (req, res) => {
  try {
    const recipes = readRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    const updatedRecipe = {
      ...recipes[index],
      ...req.body,
      id: recipes[index].id // preserve ID
    };

    recipes[index] = updatedRecipe;
    writeRecipes(recipes);

    res.json(updatedRecipe);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update recipe' });
  }
});

// DELETE /api/recipes/:id - Delete a recipe
router.delete('/:id', (req, res) => {
  try {
    let recipes = readRecipes();
    const index = recipes.findIndex(r => r.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({ error: 'Recipe not found' });
    }

    recipes.splice(index, 1);
    writeRecipes(recipes);

    res.json({ message: 'Recipe deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete recipe' });
  }
});

module.exports = router;
