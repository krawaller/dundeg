import { BattleState } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';
import { monsters } from '../library'

export interface EndOfRoundMonsterSpec {
  monsterId: string
}

export function apply_end_of_round_to_monster (battle: BattleState, {monsterId}: EndOfRoundMonsterSpec):BattleState {
  let ret:BattleState = deepCopy(battle);
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  let monRef = {monsterRef: monsterId};

  delete monster.vars.hasAttacked;

  if (monster.vars.drained){
    monster.vars.HP = Math.min( monster.vars.HP + monster.vars.drained, blueprint.stats.HP );
    addLog(ret, [monRef, 'recovered '+monster.vars.drained+' HP that it drained from adventurers this round'] );
    delete monster.vars.drained;
  }
  if (monster.states.dazed){
    delete monster.states.dazed;
    addLog(ret, [monRef, 'is no longer dazed'] );
  }
  if (monster.states.hungOver){
    delete monster.states.hungOver;
    addLog(ret, [monRef, 'is no longer hung over'] );
  }
  if (monster.states.ragingMad){
    delete monster.states.ragingMad;
    addLog(ret, [monRef, 'is no longer raging mad'] );
  }
  if (blueprint.skills.skirmish){
    addLog(ret, [monRef, 'is a skirmisher and now escapes the battle'] );
    monster.vars.escaped = true;
  }
  return ret;
}

