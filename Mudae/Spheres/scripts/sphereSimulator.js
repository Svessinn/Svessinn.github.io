/**
 * Selects an item from an array based on weights
 * @param {Array} items - The possible outcomes (e.g., ['B', 'G', 'R'])
 * @param {Array} weights - The numerical weights for those outcomes
 */
function getWeightedRandom(items, weights) {
  const totalWeight = weights.reduce((a, b) => a + b, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < items.length; i++) {
    if (random < weights[i]) return items[i];
    random -= weights[i];
  }
}

/**
 * Simulates a breakdown using provided rules
 * @param {string} sphereType - 'L' or 'D'
 * @param {Object} rules - The breakdown_rules object from your JSON
 */
function simulateBreakdown(sphereType, rules) {
  let results = [];

  if (sphereType === "L") {
    const config = rules.light;
    const count = config.count_options[Math.floor(Math.random() * config.count_options.length)];

    for (let i = 0; i < count; i++) {
      results.push(getWeightedRandom(config.possible_outcomes, config.weights));
    }
  } else if (sphereType === "D") {
    const config = rules.dark;
    const outcome = getWeightedRandom(config.possible_outcomes, config.weights);

    if (outcome === "L") {
      // Recursive call passing the same rules object forward
      results = simulateBreakdown("L", rules);
    } else {
      results.push(outcome);
    }
  }

  return results;
}
