import { BattleState, CalculationResult, HeroId, MonsterId } from '../interfaces';
import { monsters } from '../library';

export interface CalculateHeroArmourInstr { heroId: HeroId, monsterId?: MonsterId }

export function calculate_hero_armour (battle: BattleState, {heroId,monsterId}: CalculateHeroArmourInstr): CalculationResult {
  let hero = battle.heroes[heroId];
  let monster = battle.monsters[monsterId];
  let blueprint = monster && monsters[monster.blueprint];
  let val = {
    history: [['Heroes have no natural armour', 0]],
    value: 0
  };
  if (hero.items.studdedLeather){
    val.history.push(['Studded leather gives +1 ARM','+1']);
    val.value++;
  }
  let pierce = blueprint && blueprint.skills.pierce
  if (pierce){
    val.history.push([`Pierce(${pierce}) ignores ${pierce} armour`,'-'+pierce]);
    val.value = Math.max(0, val.value - pierce);
  }
  return val;
}
