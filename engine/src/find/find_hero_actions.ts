import { BattleState, FlowInstruction } from '../interfaces';
import { items, heroSkills } from '../library';
import { registerAndTarget } from '../utils/helpers';

interface InstrJustHeroId { heroId: string }


export function find_hero_actions (battle: BattleState, {heroId}: InstrJustHeroId): any {
  let ret = <any>{};

  let hero = battle.heroes[heroId];
  if (hero.vars.stance === 'assault' && hero.skills.bloodCurse){
    ret[heroSkills.bloodCurse.actions.castBloodCurse] = registerAndTarget(heroId,['flow','bloodCurse',{heroId}],['Who should',{heroRef:heroId},'cast a Blood Curse at?']);
  }
  if (hero.vars.stance === 'guard' && hero.skills.findWeakness){
    ret[heroSkills.findWeakness.actions.findWeakness] = registerAndTarget(heroId,['flow','weakness',{heroId}],['Who should',{heroRef:heroId},'look for a weakness in?']);
  }
  if (hero.items.daemonsBlood){
    ret[items.daemonsBlood.actions.throwDaemonsBlood] = registerAndTarget(heroId,['flow','daemonsBlood',{heroId}],['Who should',{heroRef:heroId},'throw the Daemon\'s Blood at?']);
  }
  if (hero.items.shrapnelBomb){
    ret[items.shrapnelBomb.actions.throwShrapnelBomb] = ['apply','registerActionSelection',{heroId, action:['flow','throwShrapnelBomb',{heroId}]}];
  }
  if (hero.items.flashBomb){
    ret[items.flashBomb.actions.throwFlashBomb] = ['apply','registerActionSelection',{heroId, action:['flow','flashBomb',{heroId}]}];
  }
  return ret;
}
