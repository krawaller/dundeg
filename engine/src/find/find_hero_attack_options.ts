import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult, HeroId } from '../interfaces';
import { items, misc } from '../library';

interface InstrJustHeroId { heroId: HeroId }

export const find_hero_attack_options = (battle: BattleState, {heroId}: InstrJustHeroId) => {
  let ret: AttackOptions = {
    [misc.basicActions.unarmedAGI]: { type: 'unarmed', stat: 'AGI' },
    [misc.basicActions.unarmedSTR]: { type: 'unarmed', stat: 'STR' }
  };
  let hero = battle.heroes[heroId];
  if (hero.items.spikedGauntlet){
    if (hero.vars.stance === 'assault'){
      ret[ items.spikedGauntlet.actions.spikedGauntletAttackAssault ] = {
        using: 'spikedGauntlet',
        type: 'meelee',
        stat: 'STR'
      };
    } else {
      ret[ items.spikedGauntlet.actions.spikedGauntletAttackDefence ] = {
        using: 'spikedGauntlet',
        type: 'meelee',
        stat: 'AGI'
      };
    }
  }
  if (hero.items.nastyCleaver){
    ret[ items.nastyCleaver.actions.nastyCleaverAttack ] = { type: 'meelee', stat: 'STR', using: 'nastyCleaver' };
  }
  if ( hero.items.skinningKnife ){
    ret[ items.skinningKnife.actions.skinningKnifeAttack ] = { type: 'meelee', stat: 'AGI', using: 'skinningKnife' };
  }
  if ( hero.items.luncheonTruncheon ){
    ret[ items.luncheonTruncheon.actions.luncheonTruncheonAttack ] = { type: 'meelee', stat: 'STR', using: 'luncheonTruncheon' };
  }

  Object.keys(ret).forEach(check => {
    if (!ret[check]){
      throw "Warning! attack action '"+check+"' was undefined!";
    }
  });

  return ret;
}
