import { HeroDefinition } from './interfaces';

interface HeroBook { [idx: string]: HeroDefinition }

export const heroes: HeroBook = {
  bloodsportBrawler: {
    skills: ['foekiller'],
    items: ['spikedGauntlet','warPaint'],
    name: 'Bloodsport Brawler',
    stats: {
      AGI: 8,
      CON: 9,
      MAG: 5,
      MRL: 8,
      PER: 6,
      STR: 9
    }
  },
  hinterLander: {
    skills: ['foekiller'],
    items: ['huntingBow', 'trailRation'],
    name: 'Hinterlander',
    stats: {
      AGI: 8,
      CON: 8,
      MAG: 7,
      MRL: 6,
      PER: 9,
      STR: 7
    }
  }
};
