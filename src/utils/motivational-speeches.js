/**
 * Collection of motivational speeches about technology freedom
 */

const motivationalSpeeches = [
  {
    quote: "Technology should be free and accessible to all, not locked behind paywalls or restricted by corporations.",
    author: "Digital Rights Advocate",
    context: "initial"
  },
  {
    quote: "The best innovations happen when minds are free to explore without boundaries or limitations.",
    author: "Open Source Philosophy",
    context: "planning"
  },
  {
    quote: "Knowledge shared is knowledge multiplied. The free exchange of ideas accelerates human progress.",
    author: "Information Freedom Movement",
    context: "implementation"
  },
  {
    quote: "True technology empowers individuals, not enslaves them to corporate interests.",
    author: "Tech Liberation Front",
    context: "testing"
  },
  {
    quote: "Open source is not just about code; it's about freedom, collaboration, and community.",
    author: "Free Software Foundation",
    context: "review"
  },
  {
    quote: "The future belongs to those who make technology a tool for human liberation, not control.",
    author: "Digital Freedom Manifesto",
    context: "improvement"
  },
  {
    quote: "Innovation flourishes in environments where information flows freely and barriers are torn down.",
    author: "Creative Commons Movement",
    context: "validation"
  },
  {
    quote: "Technology should amplify human potential, not replace human judgment and creativity.",
    author: "Human-Centered AI Ethics",
    context: "completion"
  },
  {
    quote: "The most powerful code is written by those who believe in the democratization of technology.",
    author: "Code Liberation Movement",
    context: "general"
  },
  {
    quote: "Free software is a matter of liberty, not price. To understand the concept, you should think of 'free' as in 'free speech,' not as in 'free beer.'",
    author: "Richard Stallman",
    context: "general"
  },
  {
    quote: "The internet is humanity's greatest achievement in distributed collaboration. Let's keep it that way.",
    author: "Web Decentralization Movement",
    context: "general"
  },
  {
    quote: "When code is free, innovation accelerates. When innovation accelerates, humanity progresses.",
    author: "Open Innovation Advocate",
    context: "general"
  },
  {
    quote: "The tools of creation should be in the hands of creators, not gatekeepers.",
    author: "Maker Movement",
    context: "general"
  },
  {
    quote: "True digital freedom means the right to study, modify, and share the technology we depend on.",
    author: "Digital Sovereignty Movement",
    context: "general"
  },
  {
    quote: "The best way to predict the future of technology is to invent it yourself, freely and openly.",
    author: "Alan Kay",
    context: "general"
  },
  {
    quote: "Technology is best when it brings people together and breaks down the walls that divide us.",
    author: "Community Tech Movement",
    context: "general"
  },
  {
    quote: "In a world of proprietary restrictions, open source is the path to digital enlightenment.",
    author: "Open Source Philosophy",
    context: "general"
  },
  {
    quote: "The most sustainable technology is that which empowers communities to maintain and improve it themselves.",
    author: "Sustainable Tech Movement",
    context: "general"
  },
  {
    quote: "Freedom in technology means the freedom to run, study, share, and modify software for any purpose.",
    author: "Free Software Foundation",
    context: "general"
  },
  {
    quote: "The future of technology is not about who owns it, but about who can use it to solve humanity's greatest challenges.",
    author: "Tech For Good Movement",
    context: "general"
  }
];

/**
 * Get a random motivational speech
 * @param {string} context - The context of the speech (optional)
 * @returns {object} - A motivational speech object
 */
function getRandomSpeech(context = 'general') {
  // Filter speeches by context if specified
  const contextSpeeches = motivationalSpeeches.filter(speech => 
    speech.context === context || speech.context === 'general');
  
  // If no context-specific speeches found, use general ones
  const speeches = contextSpeeches.length > 0 ? contextSpeeches : motivationalSpeeches;
  
  // Return a random speech
  const randomIndex = Math.floor(Math.random() * speeches.length);
  return speeches[randomIndex];
}

/**
 * Get all speeches for a specific context
 * @param {string} context - The context to get speeches for
 * @returns {Array} - Array of speeches for the context
 */
function getSpeechesForContext(context) {
  return motivationalSpeeches.filter(speech => 
    speech.context === context || speech.context === 'general');
}

module.exports = { getRandomSpeech, getSpeechesForContext, motivationalSpeeches };