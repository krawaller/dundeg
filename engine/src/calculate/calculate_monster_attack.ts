import { BattleState, Attack, ItemName, CalculationResult } from '../interfaces';
import { monsters } from '../library';
import { newCalc, addCalcStep } from '../utils/helpers';
import { find_monsters } from '../find/find_monsters';

interface CalculateMonsterAttackInstr { monsterId: string }

export function calculate_monster_attack (battle: BattleState, instr: CalculateMonsterAttackInstr) :CalculationResult {
  let monster = battle.monsters[instr.monsterId];
  let blueprint = monsters[monster.blueprint];
  let hero = monster.vars.target && battle.heroes[monster.vars.target];

  let ret = newCalc('Monster ATK', blueprint.name+' base ATK', blueprint.stats.ATK);

  if (blueprint.skills.fierce && hero && hero.vars.stance === 'guard'){
    ret = addCalcStep(ret, 'Fierce gives +1 VS defending hero', n=>n+2);
  }

  if (blueprint.skills.horde){
    let others = find_monsters(battle,{}).reduce((list,otherId) => {
      let other = battle.monsters[otherId];
      if (otherId !== instr.monsterId && monsters[other.blueprint].traits[blueprint.skills.horde]){
        list.push(otherId);
      }
      return list;
    },[]);
    if (others.length){
      ret = addCalcStep(ret, 'Horde('+blueprint.skills.horde+') gives +1 when '+blueprint.skills.horde+' are present', n=>n+1);
    }
  }

  if (monster.states.hungOver){
    ret = addCalcStep(ret, 'Hung over means -2 ATK', n=>n-2);
  }

  if (monster.states.ragingMad){
    ret = addCalcStep(ret, 'Raging mad means +2 ATK', n=>n+2);
  }

  if (monster.states.dazed){
    ret = addCalcStep(ret, 'Dazed means halved ATK rounding down', n=> Math.floor(n/2));
  }

  return ret;
}
