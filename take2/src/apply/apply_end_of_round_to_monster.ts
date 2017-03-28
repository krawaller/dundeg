import { BattleState } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { monsters } from '../library'

interface EndOfRoundInstr {
  monsterId: string
}

export const apply_end_of_round_to_monster = (battle: BattleState, {monsterId}: EndOfRoundInstr):BattleState => {
  let ret = deepCopy(battle);
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  let monRef = {monsterRef: monsterId};
  if (monster.vars.drained){
    monster.vars.HP = Math.min( monster.vars.HP + monster.vars.drained, blueprint.stats.HP );
    ret.log.push( [monRef, 'recovered '+monster.vars.drained+' HP that it drained from adventurers this round'] );
    delete monster.vars.drained;
  }
  if (monster.states.dazed){
    delete monster.states.dazed;
    ret.log.push( [monRef, 'is no longer dazed'] );
  }
  return ret;
}