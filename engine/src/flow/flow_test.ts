import { BattleState, MonsterId, FlowInstruction, Test, FlowAll, FlowDiceRoll, ApplyRegisterTestOutcome, FlowPickTestPath } from '../interfaces';
import { MakeRollSpec } from './flow_dice_roll';

export function flow_test(battle: BattleState, test:Test): FlowInstruction {
  let {heroId,stat,reason,dice,line} = test;
  return <FlowAll>['flow','all',[
    <FlowDiceRoll>['flow','diceRoll',{rerollable: true, heroId,line,diceTypes:{[dice]:2}}],
    <ApplyRegisterTestOutcome>['apply','registerTestOutcome',test],
    <FlowPickTestPath>['flow','pickTestPath',test]
  ]];
}
