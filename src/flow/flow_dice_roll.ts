import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, LogMessageLine, ApplyDiceRoll, FlowOfferReroll, ApplyQuestion } from '../interfaces';

export interface MakeRollSpec {
  heroId,
  diceTypes: DiceSpec,
  line: LogMessageLine
}

export function flow_dice_roll(battle: BattleState, {heroId,diceTypes,line}:MakeRollSpec): FlowInstruction {
  return <ApplyQuestion>['apply','question',{
    line: line,
    options: {
      roll: ['flow','all',[
        <ApplyDiceRoll>['apply','diceRoll',{heroId,diceTypes}],
        <FlowOfferReroll>['flow','offerReroll',{heroId,diceTypes}]
      ]]
    }
  }];
}
