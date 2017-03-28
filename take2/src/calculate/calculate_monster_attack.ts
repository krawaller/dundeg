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

  return val;
};