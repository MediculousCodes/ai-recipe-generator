import { guardrails } from '../utils/guardrails'

export async function generateRecipe(userPrompt) {
  // First validate the prompt
  const promptValidation = guardrails.validatePrompt(userPrompt);
  if (!promptValidation.isValid) {
    throw new Error(promptValidation.message);
  }

  try {
    // Your existing API call to the model
    const response = await fetch('/api/generate-recipe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: userPrompt }),
    });

    const data = await response.json();

    // Validate the response before showing it to the user
    const responseValidation = guardrails.validateResponse(data.recipe);
    if (!responseValidation.isValid) {
      throw new Error(responseValidation.message);
    }

    return data.recipe;

  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}
