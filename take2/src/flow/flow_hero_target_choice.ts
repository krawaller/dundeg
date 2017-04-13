import { BattleState, HeroId, FlowInstruction, HeroStatName, LogMessageLine, PoseQuestion, ApplyHeroTargetChoice } from '../interfaces';
import { find_party_stat } from '../find/find_party_stat';
import { monsters, heroes } from '../library';
import { isHeroAlive } from '../utils/helpers';
import { find_standing_monsters } from '../find/find_standing_monsters';

export interface HeroTargetChoiceSpec {
  heroId: HeroId
}

// TODO - no question if dont need target! also, hero's action could be taken into account?

export function flow_hero_target_choice(battle: BattleState, {heroId}:HeroTargetChoiceSpec): FlowInstruction {
  let {targettingMe, targettingOthers} = find_standing_monsters(battle).reduce((mem,monsterId)=>{
    mem[battle.monsters[monsterId].vars.target === heroId ? 'targettingMe' : 'targettingOthers'].push(monsterId);
    return mem;
  },{targettingMe:[], targettingOthers: []});
  let possibleIds = targettingMe.length ? targettingMe : targettingOthers;

  if (possibleIds.length === 1){
    return <ApplyHeroTargetChoice>['apply', 'heroTargetChoice', {heroId: heroId, monsterId: possibleIds[0]}];
  } else {
    return <PoseQuestion>['question',{
      line: ['Which monster should', {heroRef: heroId}, 'target?'],
      options: possibleIds.reduce((mem,monsterId)=>{
        mem[battle.monsters[monsterId].name] = <ApplyHeroTargetChoice>['apply', 'heroTargetChoice', {monsterId, heroId}];
        return mem;
      }, {})
    }]
  }
}
