import { C } from './constants';

import { BattleState, HeroStatName, Attack, AttackOptions, ItemName } from './interfaces';

import { monsters } from './monsters';

import { heroes } from './heroes';

export const modes = {

};


interface InstrJustHeroId { heroId: string }
interface InstrHeroStat { heroId: string, stat: HeroStatName, because?: string }

interface InstrHeroWithRoll { heroId: string, attackDice: number[], powerDie: number }

interface InstrMonsterWithHeroDetails { monsterId: string, because?: string, using?: ItemName, heroId?: string, attack?: Attack }

interface CalculationResult {
  value: any,
  history: any[]
}

interface InstrDamageVsMonster {
  monsterId: string,
  heroId?: string,
  attack?: Attack,
  using?: string,
  heroATK: CalculationResult,
  monsterARM: CalculationResult,
  powerDie?: number
}

interface InstrDamageVsHero {
  monsterId: string,
  heroId?: string,
  monsterATK: CalculationResult,
  heroARM: CalculationResult,
  heroDEF: CalculationResult
}

export const calc = {

  calc_damage_vs_hero: (battle: BattleState, instr: InstrDamageVsHero): CalculationResult => {
    let val = {
      history: [
        ['Base damage is monster ATK',instr.monsterATK.value, instr.monsterATK.history],
        ['Hero armour is subtracted','-'+instr.heroARM.value, instr.heroARM.history],
        ['As is hero defence','-'+instr.heroDEF.value, instr.heroDEF.history]
      ],
      value: instr.monsterATK.value - instr.heroARM.value - instr.heroDEF.value
    };
    return val;
  },

  calc_damage_vs_monster: (battle: BattleState, instr: InstrDamageVsMonster): CalculationResult => {
    let monster = battle.monsters[instr.monsterId];
    let hero = battle.heroes[instr.heroId];
    let val = {
      history: [
        ['Hero ATK value', instr.heroATK.value, instr.heroATK.history],
        ['Reduced by monster ARM', '-'+instr.monsterARM.value, instr.monsterARM.history]
      ],
      value: instr.heroATK.value - instr.monsterARM.value
    }
    if (hero.vars.POW === 6 && instr.using === 'nastyCleaver' && hero.vars.stance === 'assault'){
      val.history.push(['Nasty Cleaver deals 1 followup damage when assaulting', '+1']);
      val.value++;
    }
    if (val.value>0){
      if (monster.states.weakness){
        val.history.push(['Found Weakness means 1 followup damage', '+1']);
        val.value++;
      }
      if (hero.skills.exterminator && hero.vars.stance === 'assault' && monsters[monster.blueprint].traits.vermin){
        val.history.push(['Exterminator deals 1 followup damage vs Vermin when assaulting', '+1']);
        val.value++;
      }
      if (hero.skills.rage && hero.vars.stance === 'assault' && instr.attack.stat === 'STR'){
        val.history.push(['Rage deals 1 followup damage when assaulting', '+1']);
        val.value++;
      }
    }
    return val;
  },

  calc_hero_attack: (battle: BattleState, instr: InstrJustHeroId): CalculationResult => {
    let hero = battle.heroes[instr.heroId];
    let highest = Math.max.apply(Math,hero.vars.attackDice);
    let val = {
      history: [['highest die', highest]],
      value: highest
    };
    if (hero.vars.stance === 'assault' && hero.vars.POW > highest){
      val.history.push(['Assaulting heroes use power die when higher', hero.vars.POW]);
      val.value = hero.vars.POW;
    }
    return val;
  },

  calc_hero_defence: (battle: BattleState, instr: InstrJustHeroId): CalculationResult => {
    let hero = battle.heroes[instr.heroId];
    let highest = Math.max.apply(Math,hero.vars.defenceDice);
    let val = {
      history: [['heroes have no natural defence',0]],
      value: 0
    };
    if (!hero.vars.failedDefence){
      val.history.push(['Use highest die for defence when defence roll was successful', highest]);
      val.value = highest;
      if (hero.vars.stance === 'defence' && hero.vars.POW > highest){
        val.history.push(['In defence stance when defence roll was successful we can use POW for defence when higher', hero.vars.POW]);
        val.value = hero.vars.POW;
      }
    } else if (hero.vars.usePowForDefence){
      val.history.push(['Can use POW for defence once when failed defence roll', hero.vars.POW]);
      val.value = hero.vars.POW;
    }
    return val;
  },

  calc_hero_armour: (battle: BattleState, instr: InstrJustHeroId): CalculationResult => {
    let val = {
      history: [['heroes have no natural armour', 0]],
      value: 0
    };
    return val;
  },

  calc_monster_armour: (battle: BattleState, instr: InstrMonsterWithHeroDetails) :CalculationResult => {
    let monster = battle.monsters[instr.monsterId];
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
    let monster = battle.monsters[instr.monsterId];
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
    let hero = battle.heroes[instr.heroId];
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

  calc_hero_attack_options: (battle: BattleState, instr: InstrJustHeroId) => {
    let ret: AttackOptions = {};
    let hero = battle.heroes[instr.heroId];
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
    if (hero.items.nastyCleaver){
      ret['nastyCleaver'] = {
        using: 'nastyCleaver',
        type: 'meelee',
        stat: 'STR'
      };
    }
    return ret;
  }
};
