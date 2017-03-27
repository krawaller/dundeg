import { StartingHero, Entity } from './interfaces';

import { Monster } from './monsters';

import { World } from './world'

import { add, concat } from './utils';

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

export const hinterlander:StartingHero = {
  id: 'hinterlander',
  name: 'HinterLander',
  startingItems: ['huntingbow','trailration'],
  startingSkills: ['fieldcraft'],
  stats: {
    AGI: 8,
    CON: 8,
    MAG: 7,
    MRL: 6,
    PER: 9,
    STR: 7
  }
}

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
    },
    get_hero_battle_stance(e, w) {
      if (e.hero === this){
        return w.askUser("Select battle stance for "+this.name,{
          attack: (w)=> 'attack',
          defend: (w)=> 'defend'
        }).then(([opt,res])=>{
          return e.hero.state.stance = opt;
        });
      }
    },
    assign_hero_target(e, w){
      if (e.hero === this){
        return new Promise(resolve => {
          let available = w.sendEvent('find_available_targets_for_hero',{
            type: 'build',
            start: [],
            hero: this
          }).then( res => {
            let opts = res.value;
            if (opts.length === 1){
              resolve(opts[0]);
            } else if (opts.length > 1){
              let monsterOpts = opts.reduce((opts,hero)=>{
                opts[hero.id] = (w)=> hero;
                return opts;
              },{});
              w.askUser("Who shall "+this.name+" target?", monsterOpts).then(([opt,res])=> {
                resolve(res);
              });
            } else {
              // TODO - also cover case when length is 0!
              throw new Error("Not yet implemented");
            }
          });
        });
      }
    },
    find_available_targets_for_hero(e, w){ // TODO - filter out monsters that are knocked out?
      if (e.hero === this){
        let monsters = w.getAllEntities().reduce((mem,entity)=>{
          if (entity.type === 'monster'){
            mem[entity.state.target === this ? 'targettingMe' : 'others'].push(entity);
          }
          return mem;
        }, {targettingMe: [], others: []} );
        if (monsters.targettingMe.length){
          return concat(monsters.targettingMe, 'can only attack targetting monsters');
        } else {
          return concat(monsters.others, 'can attack all monsters since no one targetting hero');
        }
      }
    }
  }
}
