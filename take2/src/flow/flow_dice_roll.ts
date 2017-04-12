import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, LogMessageLine } from '../interfaces';

export interface MakeRollSpec {
  heroId,
  diceTypes: DiceSpec,
  line: LogMessageLine
}

export function flow_dice_roll(battle: BattleState, {heroId,diceTypes,line}:MakeRollSpec): FlowInstruction {
  return ['flow','ask',{
    line: line,
    options: {
      roll: ['flow','all',[
        ['apply','diceRoll',{heroId,diceTypes}],
        ['flow','offerReroll',{heroId,diceTypes}]
      ]]
    }
  }];
}
