import { HeroDefinition } from '../interfaces';

interface HeroBook { [idx: string]: HeroDefinition }

export const heroes: HeroBook = {
  angelOfDeath: {
    skills: ['sneakAttack'],
    items: ['stilleto','vialOfPoison'],
    name: 'Angel of Death',
    stats: { AGI: 8, CON: 6, MAG: 7, MRL: 7, PER: 8, STR: 6 }
  },
  bloodsportBrawler: {
    skills: ['foeKiller'],
    items: ['spikedGauntlet','warPaint'],
    name: 'Bloodsport Brawler',
    stats: { AGI: 8, CON: 9, MAG: 5, MRL: 8, PER: 6, STR: 9 }
  },
  carnivalDrifter: {
    skills: ['performance'],
    items: ['barbedWhip','fortuneCards'],
    name: 'Carnival Drifter',
    stats: { AGI: 8, CON: 6, MAG: 8, MRL: 6, PER: 7, STR: 6 }
  },
  hinterLander: {
    skills: ['fieldCraft'],
    items: ['huntingBow', 'trailRation'],
    name: 'Hinterlander',
    stats: { AGI: 8, CON: 8, MAG: 7, MRL: 6, PER: 9, STR: 7 }
  },
  infamousButcher: {
    skills: ['gourmet'],
    items: ['mysteryMeat'],
    name: 'Infamous Butcher',
    stats: { AGI: 8, CON: 8, MAG: 5, MRL: 6, PER: 5, STR: 8 }
  },
  soldierOfFortune: {
    skills: ['martialDiscipline'],
    items: ['bastardSword','shoddyShield'],
    name: 'Soldier of Fortune',
    stats: { AGI: 7, CON: 9, MAG: 5, MRL: 8, PER: 7, STR: 9 }
  }
};
