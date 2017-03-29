import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export const staticAttacks = {
  skinningKnife: { type: 'meelee', stat: 'AGI' },
  nastyCleaver: { type: 'meelee', stat: 'STR' },
  luncheonTruncheon: { type: 'meelee', stat: 'STR' }
};

export const find_hero_attack_options = (battle: BattleState, instr: InstrJustHeroId) => {
  let ret: AttackOptions = {};
  let hero = battle.heroes[instr.heroId];
  if (hero.items.spikedGauntlet){
    ret['spikedGauntlet'] = {
      using: 'spikedGauntlet',
      type: 'meelee',
      stat: hero.vars.stance === 'assault' ? 'STR' : 'AGI'
    };
  }
  Object.keys(staticAttacks).forEach(item => {
    if (hero.items[item]){
      ret[item] = Object.assign(staticAttacks[item], {using: item});
    }
  });
  return ret;
}
