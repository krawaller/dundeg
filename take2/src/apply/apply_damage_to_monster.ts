import { BattleState, CalculationResult } from '../interfaces';
import { deepCopy } from '../utils/helpers';

interface ApplyDamageToMonsterInstr {
  heroId: string
  monsterId: string
  monsterDMG: CalculationResult
  wasBloodCurse?: true
}

export function apply_damage_to_monster (battle:BattleState, {monsterId,heroId,monsterDMG,wasBloodCurse}: ApplyDamageToMonsterInstr): BattleState {
  const ret = deepCopy(battle);
  let target = ret.monsters[monsterId];
  let dealt = Math.min(target.vars.HP, monsterDMG.value);
  let heroRef = {heroRef: heroId};
  let monRef = {monsterRef: monsterId};
  if (dealt){
    target.vars.HP -= dealt;
    if (target.vars.HP){
      if (wasBloodCurse){
        ret.log.push( ['The blood curse from',{heroRef: heroId}, 'makes', {monsterRef: monsterId}, 'also take',monsterDMG,'wounds'] );
      } else {
        ret.log.push( [heroRef, 'dealt', monsterDMG, 'damage to', monRef] );
      }
    } else {
      if (wasBloodCurse){
        ret.log.push( ['The blood curse from',{heroRef: heroId}, 'knocked out', {monsterRef: monsterId}, 'by passing on',monsterDMG,'wounds'] );
        ret.log.push( ['The blood curse is now lifted.'] );
        delete ret.heroes[heroId].vars.bloodCurseLink;
        delete ret.monsters[monsterId].states.bloodCurse;
      } else {
        ret.log.push( [heroRef, 'knocked', monRef, 'out with', monsterDMG, 'damage' ] );
      }
      target.vars.killedBy = heroId;
    }
  } else {
    ret.log.push( [heroRef, 'tried to damage', monRef, 'but outcome was', monsterDMG] ); // 0 damage, stil lwant to expose calculation
  }
  return ret;  
}
