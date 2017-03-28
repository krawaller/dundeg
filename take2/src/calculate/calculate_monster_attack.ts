import { BattleState, Attack, ItemName, CalculationResult } from '../interfaces';

import { monsters } from '../library';

interface InstrMonsterWithHeroDetails { monsterId: string, because?: string, using?: ItemName, heroId?: string, attack?: Attack }

export const calculate_monster_attack = (battle: BattleState, instr: InstrMonsterWithHeroDetails) :CalculationResult => {
  let monster = battle.monsters[instr.monsterId];
  let blueprint = monsters[monster.blueprint];
  let hero = instr.heroId && battle.heroes[instr.heroId];

  let val = {
    history: [[blueprint.name, blueprint.stats.ATK]],
    value: blueprint.stats.ATK
  }

  if (blueprint.skills.fierce && hero && hero.vars.stance === 'defence'){
    val.history.push(['fierce VS defending hero', '+2']);
    val.value += 2;
  }

  if (blueprint.skills.horde){
    let others = Object.keys(battle.monsters).reduce((list,otherId) => {
      let other = battle.monsters[otherId];
      if (otherId !== instr.monsterId && monsters[other.blueprint].traits[blueprint.skills.horde] && !other.vars.killedBy){
        list.push(otherId);
      }
      return list;
    },[]);
    if (others.length){
      val.history.push( ['Horde('+blueprint.skills.horde+') gave bonus since there were other monsters with that trait', '+1'] );
      val.value += 1;
    }
  }

  return val;
};