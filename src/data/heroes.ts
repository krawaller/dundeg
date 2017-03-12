import { StartingHero, Hero } from '../interfaces';

import items from './items';

import skills from './items';

export const bloodbrawl:StartingHero = {
  id: 'bloodbrawl',
  startingSkills: ['foekiller'],
  startingItems: ['spikedgauntlet','warpaint'],
  name: 'Bloodsport Brawler',
  stats: {
    AGI: 8,
    CON: 9,
    MAG: 5,
    MRL: 8,
    PER: 6,
    STR: 9
  }
};

export const makeHero = (who: StartingHero): Hero => {
  return {
    id: who.id,
    name: who.name,
    stats: who.stats,
    skills: who.startingSkills.reduce((mem,id) => {
      mem[id] = skills[id];
      return mem;
    }, {}),
    items: who.startingItems.reduce((mem,id)=> {
      mem[id] = items[id];
      return mem;
    },{}),
    states: {}
  }
}
