import { BattleState, CalculationResult } from '../interfaces';
import { deepCopy } from '../utils/helpers';

interface ApplyDamageToMonsterInstr {
  heroId: string
  monsterId: string
  monsterDMG: CalculationResult
}

export function apply_damage_to_monster (battle:BattleState, {monsterId,heroId,monsterDMG}: ApplyDamageToMonsterInstr): BattleState {
  const ret = deepCopy(battle);
  let target = ret.monsters[monsterId];
  let dealt = Math.min(target.vars.HP, monsterDMG.value);
  let heroRef = {heroRef: heroId};
  let monRef = {monsterRef: monsterId};
  if (dealt){
    target.vars.HP -= dealt;
    if (target.vars.HP){
      ret.log.push( [heroRef, 'dealt', monsterDMG, 'damage to', monRef] );
    } else {
      ret.log.push( [heroRef, 'knocked', monRef, 'out with', monsterDMG, 'damage' ] );
      target.vars.killedBy = heroId;
    }
  } else {
    ret.log.push( [heroRef, 'attacked', monRef, 'but damage was', monsterDMG] ); // 0 damage, stil lwant to expose calculation
  }
  return ret;  
}
