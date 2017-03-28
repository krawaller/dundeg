import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

import { monsters } from '../monsters';
import { heroes } from '../heroes';

interface InstrJustHeroId { heroId: string }

export const calculate_hero_attack_options = (battle: BattleState, instr: InstrJustHeroId) => {
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