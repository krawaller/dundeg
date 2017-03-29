import { BattleState, HeroStatName, CalculationResult, StatCheckReason } from '../interfaces';

import { heroes } from '../library';

interface CalculateHeroStatInstr { heroId: string, stat: HeroStatName, reason: StatCheckReason }

export function calculate_hero_stat (battle: BattleState, instr: CalculateHeroStatInstr): CalculationResult {
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
