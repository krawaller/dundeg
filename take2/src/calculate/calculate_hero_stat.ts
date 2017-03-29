import { BattleState, HeroStatName, CalculationResult, StatCheckReason } from '../interfaces';
import { find_standing_heroes } from '../find/find_standing_heroes';
import { heroes } from '../library';

interface CalculateHeroStatInstr { heroId: string, stat: HeroStatName, reason: StatCheckReason }

export function calculate_hero_stat (battle: BattleState, {heroId, stat, reason}: CalculateHeroStatInstr): CalculationResult {
  let hero = battle.heroes[heroId];
  let blueprint = heroes[hero.blueprint];
  let val = {
    history: [[blueprint.name, blueprint.stats[stat]]],
    value: blueprint.stats[stat]
  }
  if (stat === 'MRL' && hero.states.blessed){
    val.history.push(['blessed','+1']);
    val.value++;
  }
  if (stat === 'MAG' && hero.states.exalted){
    val.history.push(['exalted','+1']);
    val.value++;
  }
  if (stat === 'CON' && hero.states.poisoned){
    val.history.push(['poisoned','-1']);
    val.value--;
  }
  if (reason === 'ambush' && find_standing_heroes(battle).filter(id=>battle.heroes[id].skills.sixthSense).length){
    val.history.push(['friend with sixth sense', '+1']);
    val.value++;
  }
  return val;
}
