import { BattleState, CalculationResult, HeroId, MonsterId } from '../interfaces';
import { monsters } from '../library';
import { newCalc, addCalcStep } from '../utils/helpers';

export interface CalculateHeroArmourInstr { heroId: HeroId, monsterId?: MonsterId }

export function calculate_hero_armour (battle: BattleState, {heroId,monsterId}: CalculateHeroArmourInstr): CalculationResult {
  let hero = battle.heroes[heroId];
  let monster = battle.monsters[monsterId];
  let blueprint = monster && monsters[monster.blueprint];

  let ret = newCalc('Hero ARM','Heroes have no natural armour',0);

  if (hero.items.studdedLeather){
    ret = addCalcStep(ret, 'Studded leather gives +1', n=>n+1);
  }
  let pierce = blueprint && blueprint.skills.pierce // is number, TODO - always?
  if (pierce){
    ret = addCalcStep(ret, `Pierce(${pierce}) ignores ${pierce} armour`, n=>n-pierce);
  }
  return ret;
}
