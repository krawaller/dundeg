import { BattleState, MonsterId, FlowInstruction, FlowTarget, FlowFurther } from '../interfaces';
import { monsters } from '../library';

export interface MonsterEntrySpec {
  monsterId: MonsterId
}

export function flow_monster_entry(battle: BattleState, {monsterId}:MonsterEntrySpec): FlowInstruction {
  let list: FlowInstruction[] = [];
  let monster = battle.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];

  if (blueprint.skills.dimwit){
    list.push(<FlowInstruction>['flow','dimwit',{monsterId}]);
  }

  if (blueprint.skills.ambush){
    list.push(<FlowInstruction>['flow','ambush',{monsterId}]);
  }

  if (!list.length){
    return undefined;
  } else if (list.length === 1){
    return list[0];
  } else {
    return <FlowInstruction>['flow','all',list];
  }
}
