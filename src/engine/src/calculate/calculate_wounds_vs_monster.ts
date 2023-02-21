/*
Takes a DMG calculation and deducts armour.
*/

import {
  BattleState,
  Attack,
  ItemName,
  CalculationResult,
  HeroId,
  MonsterId,
} from '../interfaces'
import { monsters, items } from '../library'
import { calculate_monster_armour } from './calculate_monster_armour'
import { newCalc, addCalcStep } from '../utils/helpers'

interface CalculateWoundsVsMonsterSpec {
  monsterId: MonsterId
  heroId: HeroId
  attack: Attack
  damage: CalculationResult
}

export function calculate_wounds_vs_monster(
  battle: BattleState,
  { monsterId, heroId, attack, damage }: CalculateWoundsVsMonsterSpec
): CalculationResult {
  const monster = battle.monsters[monsterId]
  const monsterBlueprint = monsters[monster.blueprint]
  const hero = battle.heroes[heroId]

  let ret = newCalc('Wounds VS monster', ['Incoming ATK', damage], damage.value)

  const armour = calculate_monster_armour(battle, { monsterId, heroId, attack })

  ret = addCalcStep(
    ret,
    ['Subtract monster ARM', armour],
    (n) => n - armour.value
  )

  if (ret.value > 0) {
    if (monster.states.weakness) {
      ret = addCalcStep(
        ret,
        'Found Weakness deals additional damage',
        (n) => n + 1
      )
    }
    if (
      hero.skills.exterminator &&
      hero.vars.stance === 'assault' &&
      monsterBlueprint.traits.vermin
    ) {
      ret = addCalcStep(
        ret,
        'Exterminator deals additional damage when assaulting Vermin',
        (n) => n + 1
      )
    }
    if (
      hero.skills.rage &&
      hero.vars.stance === 'assault' &&
      attack.stat === 'STR' &&
      monster.vars.target === heroId
    ) {
      ret = addCalcStep(
        ret,
        'Rage deals additional damage when assaulting facing monster',
        (n) => n + 1
      )
    }
    if (
      hero.skills.foeKiller &&
      hero.vars.stance === 'assault' &&
      monsterBlueprint.value >= 3
    ) {
      ret = addCalcStep(
        ret,
        'Foekiller deals additional damage when assaulting value 3+ enemies',
        (n) => n + 1
      )
    }
  }

  return ret
}
