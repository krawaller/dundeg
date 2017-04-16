import { BattleState, CalculationResult, HeroId, MonsterId, Attack } from '../interfaces';
import { deepCopy, addLog } from '../utils/helpers';

export interface WoundMonsterSpec {
  heroId: HeroId
  monsterId: MonsterId
  wounds: CalculationResult
  attack: Attack
}

export function apply_wounds_to_monster (battle:BattleState, {monsterId,heroId,wounds,attack}: WoundMonsterSpec): BattleState {
  const ret = deepCopy(battle);
  let target = ret.monsters[monsterId];
  let dealt = Math.min(target.vars.HP, wounds.value);
  let heroRef = {heroRef: heroId};
  let monRef = {monsterRef: monsterId};
  if (dealt){
    target.vars.HP -= dealt;
    if (target.vars.HP){
      if (attack.skill === 'bloodCurse'){
        addLog(ret, ['The blood curse from',{heroRef: heroId}, 'makes', {monsterRef: monsterId}, 'also take',wounds,'wounds'] );
      } else {
        addLog(ret, [monRef, 'took', wounds, 'wounds'] );
      }
    } else {
      if (attack.skill === 'bloodCurse'){
        addLog(ret, ['The blood curse from',{heroRef: heroId}, 'knocked out', {monsterRef: monsterId}, 'by passing on',wounds,'wounds'] );
        addLog(ret, ['The blood curse is now lifted.'] );
        delete ret.heroes[heroId].vars.bloodCurseLink;
        delete ret.monsters[monsterId].states.bloodCurse;
      } else {
        addLog(ret, [monRef, 'took', wounds, 'wounds and was knocked out'] );
      }
      target.vars.killedBy = heroId;
    }
  } else {
    addLog(ret, [monRef, 'took', wounds, 'wounds'] ); // 0 damage, still want to expose calculation
  }
  return ret;  
}
