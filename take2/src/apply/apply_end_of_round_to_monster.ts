import { BattleState } from '../interfaces';

import { monsters } from '../library'

interface EndOfRoundInstr {
  monsterId: string
}

export const apply_end_of_round_to_monster = (battle: BattleState, {monsterId}: EndOfRoundInstr):BattleState => {
  let ret = battle; // TODO - copy
  let monster = ret.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  if (monster.vars.drained){
    monster.vars.HP = Math.min( monster.vars.HP + monster.vars.drained, blueprint.stats.HP );
    ret.log.push( [{monsterRef: monsterId}, 'recovered '+monster.vars.drained+' HP that it drained from adventurers this round'] );
    delete monster.vars.drained;
  }
  return ret;
}