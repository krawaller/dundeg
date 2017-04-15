import { die } from '../src/utils/rand';

let seed = process.argv[2];

console.log("Seed",seed,"will give you",die(seed),die(seed),die(seed),die(seed),die(seed));