import { BattleState, FlowInstruction } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export function find_hero_actions (battle: BattleState, {heroId}: InstrJustHeroId): any {
  let ret = <any>{};
  let hero = battle.heroes[heroId];
  if (hero.vars.stance === 'assault' && hero.skills.bloodCurse){
    ret.bloodCurse = <FlowInstruction>['flow','bloodCurse',{heroId}];
  }
  if (hero.vars.stance === 'defence' && hero.skills.findWeakness){
    ret.findWeakness = <FlowInstruction>['flow','weakness',{heroId}];
  }
  if (hero.items.daemonsBlood){
    ret.daemonsBlood = <FlowInstruction>['flow','daemonsBlood',{heroId}];
  }
  if (hero.items.shrapnelBomb){
    ret.shrapnelBomb = <FlowInstruction>['flow','throwShrapnelBomb',{heroId}];
  }
  if (hero.items.flashBomb){
    ret.flashBomb = <FlowInstruction>['flow','flashBomb',{heroId}];
  }
  return ret;
}
