
import { MonsterDefinition, Entity } from './interfaces';

import { add } from './utils';

export const manAtArms: MonsterDefinition = {
  name: 'Man-At-Arms',
  traits: ['human','law','militant'],
  stats: {
    ATK: 4,
    ARM: 2,
    HP: 4
  },
  targets: 'AGI+'
}

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
    },
    get_monster_target(e,world){
      let lookForProp = this.props.targets.substr(0,3); // TODO - move
      let lookForHighest = this.props.targets[3] === '+';
      if (e.monster === this){
        return new Promise((resolve)=>{ // TODO - will swallow errors :/
          Promise.all( // TODO - should e.chooseFrom perhaps be calculated here instead?
            e.chooseFrom.map(hero => {
              return world.sendEvent('calculate_hero_stat',{
                type: 'build',
                start: 0,
                hero: hero,
                stat: lookForProp,
                because: 'decideTarget',
                monster: this
              });
            })
          ).then((calcs:any[])=>{
            let boil = calcs.reduce((mem,calc)=>{
              if (calc.value === mem.val){
                mem.heroes.push(calc.event.hero);
              } else if (lookForHighest && calc.value > mem.val || !lookForHighest && calc.value < mem.val){
                mem.heroes = [calc.event.hero];
                mem.val = calc.value;
              }
              return mem;
            }, {val: lookForHighest ? -Infinity : Infinity, heroes: []});
            if (boil.heroes.length === 1){
              this.state.target = boil.heroes[0];
              resolve(boil.heroes[0]);
            } else {
              let heroOpts = boil.heroes.reduce((opts,hero)=>{
                opts[hero.id] = (w)=> hero
                return opts;
              },{});
              world.askUser("Who shall "+this.name+" target?", heroOpts).then(([opt,res])=> {
                this.state.target = res;
                resolve(res);
              });
            }
          })
        });
      }
    }
  }
};