import { BattleState, CalculationResult, HeroId, MonsterId, FlowInstruction, FlowTarget, DiceSpec, ApplyQuestion } from '../interfaces';

export interface InitiateWoundMonsterSpec {
  heroId: HeroId
  monsterId: MonsterId
  wounds: CalculationResult
}

export function flow_wound_monster(battle: BattleState, spec:InitiateWoundMonsterSpec): FlowInstruction {
  return ['apply','woundMonster',spec];
}

// TODO - move some stuff from applywoundstomonster here?
// TODO - new registerKill hook here too?
