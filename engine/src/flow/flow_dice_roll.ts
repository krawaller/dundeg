import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, LogMessageLine, ApplyDiceRoll, FlowOfferReroll, ApplyQuestion } from '../interfaces';

export interface MakeRollSpec {
  heroId,
  diceTypes: DiceSpec,
  line: LogMessageLine,
  rerollable?: boolean
}

export function flow_dice_roll(battle: BattleState, {heroId,diceTypes,line,rerollable}:MakeRollSpec): FlowInstruction {
  return <ApplyQuestion>['apply','question',{
    line: line,
    options: {
      roll: rerollable ? ['flow','all',[
        <ApplyDiceRoll>['apply','diceRoll',{heroId,diceTypes}],
        <FlowOfferReroll>['flow','offerReroll',{heroId,diceTypes}]
      ]] : <ApplyDiceRoll>['apply','diceRoll',{heroId,diceTypes}]
    }
  }];
}
