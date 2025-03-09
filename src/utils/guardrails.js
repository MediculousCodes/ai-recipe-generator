export const guardrails = {
  // Blocked topics/terms
  deniedTopics: [
    'alcohol',
    'harmful substances',
    'dangerous cooking methods',
    'raw/unsafe ingredients'
    'rice'
  ],

  // Content filters
  filters: {
    profanity: true,
    toxicity: true,
    personalInformation: true
  },

  // Validation function for prompts
  validatePrompt: function(prompt) {
    // Convert to lowercase for checking
    const lowerPrompt = prompt.toLowerCase();

    // Check against denied topics
    const containsDeniedTopic = this.deniedTopics.some(topic =>
      lowerPrompt.includes(topic)
    );

    if (containsDeniedTopic) {
      return {
        isValid: false,
        message: "This prompt contains inappropriate or unsafe content."
      };
    }

    return {
      isValid: true,
      message: ""
    };
  },

  // Validation function for responses
  validateResponse: function(response) {
    const lowerResponse = response.toLowerCase();

    // Check against denied topics
    const containsDeniedTopic = this.deniedTopics.some(topic =>
      lowerResponse.includes(topic)
    );

    if (containsDeniedTopic) {
      return {
        isValid: false,
        message: "The generated response contains inappropriate or unsafe content."
      };
    }

    return {
      isValid: true,
      message: ""
    };
  }
};
