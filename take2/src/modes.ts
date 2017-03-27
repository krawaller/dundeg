import { C } from './constants';

import { BattleState, HeroStatName, Attack, AttackOptions, ItemName } from './interfaces';

import { monsters } from './monsters';

import { heroes } from './heroes';

export const modes = {

};


interface InstrJustId { id: string }
interface InstrHeroStat { id: string, stat: HeroStatName, because?: string }

interface InstrMonsterWithHeroDetails { id: string, because?: string, using?: ItemName, heroId?: string }

interface CalculationResult {
  value: any,
  history: any[]
}

export const calc = {

  calc_monster_armour: (battle: BattleState, instr: InstrMonsterWithHeroDetails) :CalculationResult => {
    let monster = battle.monsters[instr.id];
    let blueprint = monsters[monster.blueprint];
    let val = {
      history: [[blueprint.name, blueprint.stats.ARM]],
      value: blueprint.stats.ARM
    }

    if (monster.states.corroded){
      val.history.push(['corroded',0]);
      val.value = 0;
      return val; // nothing else matters, force to 0;
    }

    if (blueprint.traits.filth && instr.using === 'skinningKnife'){
      val.history.push(['skinning knife VS filth', '-1']);
      val.value = Math.max( 0, val.value - 1 );
    }

    return val;
  },

  calc_monster_attack: (battle: BattleState, instr: InstrMonsterWithHeroDetails) :CalculationResult => {
    let monster = battle.monsters[instr.id];
    let blueprint = monsters[monster.blueprint];
    let hero = instr.heroId && battle.heroes[instr.heroId];

    let val = {
      history: [[blueprint.name, blueprint.stats.ATK]],
      value: blueprint.stats.ATK
    }

    if (monster.states.fierce && hero && hero.vars.stance === 'defence'){
      val.history.push(['fierce VS defending hero', '+2']);
      val.value += 2;
    }

    return val;
  },

  calc_hero_stat: (battle: BattleState, instr: InstrHeroStat) => {
    let hero = battle.heroes[instr.id];
    let blueprint = heroes[hero.blueprint];
    let val = {
      history: [[blueprint.name, blueprint.stats[instr.stat]]],
      value: blueprint.stats[instr.stat]
    }
    if (instr.stat === 'MRL' && hero.states.blessed){
      val.history.push(['blessed','+1']);
      val.value++;
    }
    if (instr.stat === 'MAG' && hero.states.exalted){
      val.history.push(['exalted','+1']);
      val.value++;
    }
    if (instr.stat === 'CON' && hero.states.poisoned){
      val.history.push(['poisoned','-1']);
      val.value--;
    }
    return val;
  },

  calc_hero_attack_options: (battle: BattleState, instr: InstrJustId) => {
    let ret: AttackOptions = {};
    let hero = battle.heroes[instr.id];
    if (hero.items.spikedGauntlet){
      ret['spikedGauntlet'] = {
        using: 'spikedGauntlet',
        type: 'meelee',
        stat: hero.vars.stance === 'assault' ? 'STR' : 'AGI'
      };
    }
    if (hero.items.skinningKnife){
      ret['skinningKnife'] = {
        using: 'skinningKnife',
        type: 'meelee',
        stat: 'AGI'
      };
    }
    return ret;
  }
};
