import React, { useState } from 'react';
import { generateRecipe } from '../services/recipeService';

export function RecipeGenerator() {
  const [error, setError] = useState(null);
  const [recipe, setRecipe] = useState(null);

  const handleGenerateRecipe = async (prompt) => {
    try {
      setError(null);
      const generatedRecipe = await generateRecipe(prompt);
      setRecipe(generatedRecipe);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="recipe-generator">
      {/* Your input component */}

      {error && (
        <div className="error-message glass-card">
          {error}
        </div>
      )}

      {recipe && (
        <div className="recipe-display glass-card">
          {/* Display your recipe */}
        </div>
      )}
    </div>
  );
}
