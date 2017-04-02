import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

import { monsters, heroes } from '../library';
import { find_standing_monsters } from '../find/find_standing_monsters';
import { deepCopy, isMonsterAlive, addLog } from '../utils/helpers';
import { apply_damage_to_monster } from './apply_damage_to_monster';

interface ApplyDamageToHeroInstr {
  heroId: string,
  monsterId: string,
  heroDMG: CalculationResult
}

export function apply_damage_to_hero (battle: BattleState, {heroId,monsterId,heroDMG}: ApplyDamageToHeroInstr): BattleState {
  let ret = deepCopy(battle);
  let monster = ret.monsters[monsterId];
  let target = ret.heroes[heroId];
  let blueprint = monsters[monster.blueprint];
  let monRef = {monsterRef: monsterId};
  let heroRef = {heroRef: heroId};

  if (blueprint.skills.thief){
    if (!heroDMG.value){
      addLog(ret, [monRef, 'attacked', heroRef, 'but damage was', heroDMG] ); // 0 damage, stil lwant to expose calculation
    } else if (!target.vars.gold){
      addLog(ret, [monRef, 'tried to steal', heroDMG, 'gold but', heroRef, 'was already broke'] );
    } else {
      let dealt = Math.min(target.vars.gold, heroDMG.value);
      target.vars.gold -= dealt;
      if (target.vars.gold){
        addLog(ret, [monRef, 'stole', heroDMG, 'gold from', heroRef] );
      } else {
        addLog(ret, [monRef, 'stole', heroDMG, 'gold, leaving', heroRef, ' completely broke!'] );
      }
    }
  } else {
    let dealt = Math.min(target.vars.HP, heroDMG.value);
    if (dealt){
      target.vars.HP -= dealt;
      if (target.vars.HP){
        addLog(ret, [monRef, 'dealt', heroDMG, 'damage to', heroRef] );
      } else {
        addLog(ret, [monRef, 'knocked', heroRef, 'out with', heroDMG, 'damage' ] );
      }
      if (blueprint.skills.drain){
        ret.monsters[monsterId].vars.drained = (monster.vars.drained || 0) + dealt;
        addLog(ret, [monRef, 'has drain and will recover as many wounds at the end of round'] );
      }
      if (blueprint.skills.infect && !target.states.infected){
        target.states.infected = true;
        addLog(ret, [monRef, 'infected', heroRef, 'preventing HP recovery during next rest'] );
      }
      if (target.vars.bloodCurseLink){
        let monsterVictim = battle.monsters[target.vars.bloodCurseLink];
        if (monsterVictim && isMonsterAlive(monsterVictim)){
          let monsterDMG = {
            value: dealt, history: [['Blood curse passes wounds on',dealt]]
          };
          ret = apply_damage_to_monster(ret, {monsterId: target.vars.bloodCurseLink, monsterDMG, heroId, wasBloodCurse: true });
        }
      }
    } else {
      addLog(ret, [monRef, 'attacked', heroRef, 'but damage was', heroDMG] ); // 0 damage, still want to expose calculation
    }
  }
  return ret;
}
