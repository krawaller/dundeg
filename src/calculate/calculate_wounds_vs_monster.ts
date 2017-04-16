/*
Takes a DMG calculation and deducts armour.
*/

import { BattleState, Attack, ItemName, CalculationResult, HeroId, MonsterId } from '../interfaces';
import { monsters, items } from '../library';
import { calculate_monster_armour } from './calculate_monster_armour';

interface CalculateWoundsVsMonsterSpec {
  monsterId: MonsterId,
  heroId: HeroId,
  attack: Attack,
  damage: CalculationResult
}

export function calculate_wounds_vs_monster (battle: BattleState, {monsterId, heroId, attack, damage}: CalculateWoundsVsMonsterSpec):CalculationResult {
  let monster = battle.monsters[monsterId];
  let monsterBlueprint = monsters[monster.blueprint];
  let hero = battle.heroes[heroId];

  let val:CalculationResult = {
    history: ['attack damage', damage],
    value: damage.value
  };

  let armour = calculate_monster_armour(battle, {monsterId, heroId, attack});

  val.history.push( [ 'deduct monster armour', armour ] );
  val.value = Math.max(  damage.value - armour.value, 0 );

  if (val.value>0){
    if (monster.states.weakness){
      val.history.push(['Found Weakness means 1 followup damage', '+1']);
      val.value++;
    }
    if (hero.skills.exterminator && hero.vars.stance === 'assault' && monsterBlueprint.traits.vermin){
      val.history.push(['Exterminator deals 1 followup damage vs Vermin when assaulting', '+1']);
      val.value++;
    }
    if (hero.skills.rage && hero.vars.stance === 'assault' && attack.stat === 'STR' && monster.vars.target === heroId){
      val.history.push(['Rage deals 1 followup damage when assaulting monster targetting you', '+1']);
      val.value++;
    }
    if (hero.skills.foeKiller && hero.vars.stance === 'assault' && monsterBlueprint.value >= 3){
      val.history.push(['Foekiller deals 1 followup damage when assaulting value 3+ enemies', '+1']);
      val.value++;
    }
  }

  return val;
}
