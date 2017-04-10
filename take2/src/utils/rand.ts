let seedrandom = require('seedrandom');

let cache = {};

export function die(seed){
  let rng = cache[seed] || (cache[seed] = seedrandom(seed));
  return Math.floor(rng()*6)+1;
}
