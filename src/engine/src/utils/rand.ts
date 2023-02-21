const seedrandom = require('seedrandom')

const cache = {}

export function die(seed) {
  const rng = cache[seed] || (cache[seed] = seedrandom(seed))
  return Math.floor(rng() * 6) + 1
}
