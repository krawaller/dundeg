import { BattleState, MonsterId, FlowInstruction, Test, FlowAll, FlowDiceRoll, ApplyRegisterTestOutcome, FlowPickTestPath } from '../interfaces';
import { MakeRollSpec } from './flow_dice_roll';

export function flow_test(battle: BattleState, test:Test): FlowInstruction {
  let {heroId,stat,reason,dice,line} = test;
  return <FlowAll>['flow','all',[
    <FlowDiceRoll>['flow','diceRoll',{heroId,line,diceTypes:{[dice]:true}}],
    <ApplyRegisterTestOutcome>['apply','registerTestOutcome',test],
    <FlowPickTestPath>['flow','pickTestPath',test]
  ]];
}
