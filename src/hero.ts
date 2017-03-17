import { StartingHero, Entity } from './interfaces';

import { add } from './utils';

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

export class Hero implements Entity {
  props: any = {}
  state: any = {}
  type = 'hero'
  name: string
  id: string
  constructor(def: StartingHero){
    this.props.stats = def.stats;
    this.name = def.name;
  }
  hooks = {
    calculate_hero_stat(e) {
      if (e.hero === this){
        return add(this.props.stats[e.stat], this.name);
      }
    }
  }
}
