import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';
import { newCalc, addCalcStep } from '../utils/helpers';
import { monsters, heroes } from '../library';
import { deepCopy, isMonsterAlive, addLog } from '../utils/helpers';
import { apply_wounds_to_monster } from './apply_wounds_to_monster';

export interface WoundHeroSpec {
  heroId: string,
  monsterId: string,
  wounds: CalculationResult
}

export function apply_wounds_to_hero (battle: BattleState, {heroId,monsterId,wounds}: WoundHeroSpec): BattleState {
  let ret = deepCopy(battle);
  let monster = ret.monsters[monsterId];
  let target = ret.heroes[heroId];
  let blueprint = monsters[monster.blueprint];
  let monRef = {monsterRef: monsterId};
  let heroRef = {heroRef: heroId};

  if (blueprint.skills.thief){
    if (wounds.value > target.vars.gold){
      wounds.value = target.vars.gold;
      wounds.history.push([heroRef,'only had '+target.vars.gold+' gold']);
    }
    target.vars.gold -= wounds.value;
    addLog(ret, [heroRef, 'lost', wounds, 'gold'] );
  } else {
    if (wounds.value > target.vars.HP){
      wounds.value = target.vars.HP;
      wounds.history.push([heroRef,'only had '+target.vars.HP+' HP']);
    }
    if (wounds.value){
      target.vars.HP -= wounds.value;
      if (!target.vars.HP){
        addLog(ret, [heroRef, 'took', wounds, 'and was knocked out!'] );
      } else {
        addLog(ret, [heroRef, 'took', wounds] );
      }
      if (blueprint.skills.drain){
        ret.monsters[monsterId].vars.drained = (monster.vars.drained || 0) + wounds.value;
        addLog(ret, [monRef, 'has drain and will recover as many wounds at the end of round'] );
      }
      if (blueprint.skills.infect && !target.states.infected){
        target.states.infected = true;
        addLog(ret, [monRef, 'infected', heroRef, 'preventing HP recovery during next rest'] );
      }
      if (target.vars.bloodCurseLink){
        let monsterVictim = battle.monsters[target.vars.bloodCurseLink];
        if (monsterVictim && isMonsterAlive(monsterVictim)){
          let bloodCurseWounds = newCalc('Blood Curse damage',['Blood Curse bounces back the', wounds, 'wounds'], wounds.value);
          ret = apply_wounds_to_monster(ret, {attack: {type: 'special', skill: 'bloodCurse'}, monsterId: target.vars.bloodCurseLink, wounds:bloodCurseWounds, heroId });
        }
      }
    } else {
      addLog(ret, [heroRef, 'took', wounds] ); // 0 damage, still want to expose calculation
    }
  }
  return ret;
}
