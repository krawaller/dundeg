
import { MonsterDefinition, Entity } from './interfaces';

import { add } from './utils';

export const swampTroll: MonsterDefinition = {
  name: 'Swamp Troll',
  traits: ['filth'],
  stats: {
    ATK: 6,
    ARM: 0,
    HP: 12
  },
  targets: 'STR+'
};

export const slitherFish: MonsterDefinition = {
  name: 'Slither Fish',
  traits: ['filth','fishoid','vermin'],
  stats: {
    ATK: 3,
    ARM: 2,
    HP: 3
  },
  targets: 'CON+'
};

export const backAlleyBruiser: MonsterDefinition = {
  name: 'Back Alley Bruiser',
  traits: ['bandit'],
  stats: {
    ATK: 4,
    ARM: 0,
    HP: 4
  },
  targets: 'STR-'
};

export class Monster implements Entity {
  props: any
  type = 'monster'
  name: string
  state:any = {}
  constructor(def: MonsterDefinition){
    this.name = def.name;
    this.props = {
      ...def.traits.reduce((mem,t)=> ({[t]:1, ...mem}),{}),
      ...def.stats,
      targets: def.targets
    };
  }
  hooks = {
    calculate_monster_stat(e){
      if (e.monster === this){
        return add(this.props[e.stat], this.name);
      }
    }
  }
};