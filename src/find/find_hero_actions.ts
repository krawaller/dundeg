import { BattleState, FlowInstruction } from '../interfaces';
import { items, heroSkills } from '../library';

interface InstrJustHeroId { heroId: string }


export function find_hero_actions (battle: BattleState, {heroId}: InstrJustHeroId): any {
  let ret = <any>{};

  let hero = battle.heroes[heroId];
  if (hero.vars.stance === 'assault' && hero.skills.bloodCurse){
    ret[heroSkills.bloodCurse.actions.castBloodCurse] = <FlowInstruction>['flow','all',[
      <FlowInstruction>['apply','registerActionSelection', {heroId,action:['flow','bloodCurse',{heroId}]}],
      <FlowInstruction>['flow','heroTargetChoice', {heroId, line: ['Who should',{heroRef:heroId},'cast a Blood Curse at?']}]
    ]]
  }
  if (hero.vars.stance === 'defence' && hero.skills.findWeakness){
    ret[heroSkills.findWeakness.actions.findWeakness] = <FlowInstruction>['flow','all',[
      <FlowInstruction>['apply','registerActionSelection', {heroId, action:['flow','weakness',{heroId}]}],
      <FlowInstruction>['flow','heroTargetChoice', {heroId, line: ['Who should',{heroRef:heroId},'look for a weakness in?']}]
    ]];
  }
  if (hero.items.daemonsBlood){
    ret[items.daemonsBlood.actions.throwDaemonsBlood] = <FlowInstruction>['flow','all',[
      <FlowInstruction>['apply', 'registerActionSelection', {heroId, action:['flow','daemonsBlood',{heroId}]}],
      <FlowInstruction>['flow','heroTargetChoice', {heroId, line: ['Who should',{heroRef:heroId},'throw the Daemon\'s Blood at?']}]
    ]]
  }
  if (hero.items.shrapnelBomb){
    ret[items.shrapnelBomb.actions.throwShrapnelBomb] = <FlowInstruction>['apply','registerActionSelection',{heroId, action:['flow','throwShrapnelBomb',{heroId}]}];
  }
  if (hero.items.flashBomb){
    ret[items.flashBomb.actions.throwFlashBomb] = <FlowInstruction>['apply','registerActionSelection',{heroId, action:['flow','flashBomb',{heroId}]}];
  }
  return ret;
}
