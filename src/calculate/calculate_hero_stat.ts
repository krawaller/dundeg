import { BattleState, HeroStatName, CalculationResult, StatCheckReason } from '../interfaces';
import { find_heroes } from '../find/find_heroes';
import { heroes } from '../library';
import { newCalc, addCalcStep } from '../utils/helpers';

interface CalculateHeroStatInstr { heroId: string, stat: HeroStatName, reason: StatCheckReason }

export function calculate_hero_stat (battle: BattleState, {heroId, stat, reason}: CalculateHeroStatInstr): CalculationResult {
  let hero = battle.heroes[heroId];
  let blueprint = heroes[hero.blueprint];
  let ret = newCalc('Hero '+stat, blueprint.name+' base '+stat, blueprint.stats[stat]);
  if (stat === 'MRL' && hero.states.blessed){
    ret = addCalcStep(ret, 'Blessed gives +1 MRL', n=>n+1);
  }
  if (stat === 'MAG' && hero.states.exalted){
    ret = addCalcStep(ret, 'Exalted gives +1 MAG', n=>n+1);
  }
  if (stat === 'CON' && hero.states.poisoned){
    ret = addCalcStep(ret, 'Poisoned gives -1 CON', n=>n-1);
  }
  if (reason === 'ambush' && find_heroes(battle).filter(id=>battle.heroes[id].skills.sixthSense).length){
    ret = addCalcStep(ret, 'Friend with Sixth Sense gives +1 VS Ambush', n=>n+1);
  }
  if (stat === 'PER' && hero.states.focused){
    ret = addCalcStep(ret, 'Focused gives +1 PER', n=>n+1);
  }
  return ret;
}
