import { BattleState, FlowInstruction } from '../interfaces';
import { items, heroSkills } from '../library';

interface InstrJustHeroId { heroId: string }

export function find_hero_actions (battle: BattleState, {heroId}: InstrJustHeroId): any {
  let ret = <any>{};
  let hero = battle.heroes[heroId];
  if (hero.vars.stance === 'assault' && hero.skills.bloodCurse){
    ret[heroSkills.bloodCurse.actions.castBloodCurse] = <FlowInstruction>['flow','bloodCurse',{heroId}];
  }
  if (hero.vars.stance === 'defence' && hero.skills.findWeakness){
    ret[heroSkills.findWeakness.actions.findWeakness] = <FlowInstruction>['flow','weakness',{heroId}];
  }
  if (hero.items.daemonsBlood){
    ret[items.daemonsBlood.actions.throwDaemonsBlood] = <FlowInstruction>['flow','daemonsBlood',{heroId}];
  }
  if (hero.items.shrapnelBomb){
    ret[items.shrapnelBomb.actions.throwShrapnelBomb] = <FlowInstruction>['flow','throwShrapnelBomb',{heroId}];
  }
  if (hero.items.flashBomb){
    ret[items.flashBomb.actions.throwFlashBomb] = <FlowInstruction>['flow','flashBomb',{heroId}];
  }
  return ret;
}
