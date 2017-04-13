import { BattleState, MonsterId, FlowInstruction, FlowTarget, FlowFurther, ApplyDimwitResult } from '../interfaces';
import { monsters } from '../library';

export interface MonsterEntrySpec {
  monsterId: MonsterId
}

export function flow_monster_entry(battle: BattleState, {monsterId}:MonsterEntrySpec): FlowInstruction {
  let list: FlowInstruction[] = [];
  let monster = battle.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];

  if (blueprint.skills.dimwit){
    list.push(<ApplyDimwitResult>['apply','dimwitResult',{
      monsterId: monsterId,
      result: ['hungOver','ragingMad','sober'][Math.floor(Math.random()*3)] // TODO seed
    }])
  }

  if (blueprint.skills.ambush){
    list.push(<FlowInstruction>['flow','eachHero',heroId=>{
      return <FlowTarget>['flow','test',{
        heroId: heroId,
        reason: 'ambush',
        stat: 'PER',
        dice: 'defence',
        line: [{heroRef:heroId},'must test against PER to avoid ambush by',{monsterRef:monsterId}],
        success: ['apply', 'ambushResult', {heroId: heroId, monsterId: monsterId}],
        failure: ['apply', 'ambushResult', {heroId: heroId, monsterId: monsterId}]
      }];
    }]);
  }

  if (!list.length){
    return undefined;
  } else if (list.length === 1){
    return list[0];
  } else {
    return <FlowInstruction>['flow','all',list];
  }
}
