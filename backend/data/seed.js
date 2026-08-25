const fs = require('fs');
const path = require('path');

const recipesPath = path.join(__dirname, 'recipes.json');

console.log('🌱 Checking recipes data integrity at:', recipesPath);

try {
  const data = fs.readFileSync(recipesPath, 'utf-8');
  const recipes = JSON.parse(data);
  console.log(`✅ Database successfully loaded with ${recipes.length} sample recipes!`);
} catch (err) {
  console.error('❌ Error loading seed data:', err.message);
  process.exit(1);
}
