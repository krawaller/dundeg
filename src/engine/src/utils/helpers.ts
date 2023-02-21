import {
  HeroId,
  MonsterState,
  MonsterTraitName,
  BattleState,
  HeroState,
  ItemName,
  LogMessageLine,
  LogMessageType,
  FlowInstruction,
  CalculationResult,
} from '../interfaces'

import { monsters } from '../library'
import { HeroTargetChoiceSpec } from '../flow/flow_hero_target_choice'

//import deepClcloone from 'lodash/cloneDeep';

export const isMonsterAlive = (monster: MonsterState) =>
  !monster.vars.killedBy && !monster.vars.escaped

export const monsterHasTrait = (
  monster: MonsterState,
  trait: MonsterTraitName
) => monsters[monster.blueprint].traits[trait]

export const deepCopy = require('lodash/cloneDeep') //(obj: BattleState): BattleState => deepClone(obj); // JSON.parse(JSON.stringify(obj));

export const isHeroAlive = (hero: HeroState) =>
  hero && !hero.vars.escaped && !hero.vars.knockedOutBy

export function removeAnItem(hero: HeroState, item: ItemName) {
  hero.items[item]--
  if (!hero.items[item]) {
    delete hero.items[item]
  }
}

export function addLog(
  battle: BattleState,
  line: LogMessageLine,
  type: LogMessageType = 'info'
): BattleState {
  battle.log = (battle.log || []).concat({
    type: type,
    line: line,
  })
  return battle
}

export function registerAndTarget(
  heroId: HeroId,
  action: FlowInstruction,
  line: LogMessageLine
): FlowInstruction {
  return <FlowInstruction>[
    'flow',
    'all',
    [
      <FlowInstruction>['apply', 'registerActionSelection', { heroId, action }],
      <FlowInstruction>['flow', 'heroTargetChoice', { heroId, line }], // TODO - what kind, allow spec?
    ],
  ]
}

export function newCalc(
  title: string,
  initialDesc: string | LogMessageLine,
  startVal: number | CalculationResult
): CalculationResult {
  return {
    title: title,
    value: (<CalculationResult>startVal).value || startVal,
    history: [
      [
        Array.isArray(initialDesc) ? initialDesc : [initialDesc],
        (<CalculationResult>startVal).value || startVal,
      ],
    ],
  }
}

export function addCalcStep(
  calc: CalculationResult,
  desc: string | LogMessageLine,
  func: (oldVal: number) => number
): CalculationResult {
  const newVal = Math.max(0, func(calc.value))
  calc.value = newVal
  calc.history.push([Array.isArray(desc) ? desc : [desc], newVal])
  return calc
}
