import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

import { heroes } from '../library';

interface InstrHeroStat { heroId: string, stat: HeroStatName, because?: string }

export function calculate_hero_stat (battle: BattleState, instr: InstrHeroStat) {
  let hero = battle.heroes[instr.heroId];
  let blueprint = heroes[hero.blueprint];
  let val = {
    history: [[blueprint.name, blueprint.stats[instr.stat]]],
    value: blueprint.stats[instr.stat]
  }
  if (instr.stat === 'MRL' && hero.states.blessed){
    val.history.push(['blessed','+1']);
    val.value++;
  }
  if (instr.stat === 'MAG' && hero.states.exalted){
    val.history.push(['exalted','+1']);
    val.value++;
  }
  if (instr.stat === 'CON' && hero.states.poisoned){
    val.history.push(['poisoned','-1']);
    val.value--;
  }
  return val;
}
