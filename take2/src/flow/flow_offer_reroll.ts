import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, PoseQuestion } from '../interfaces';

export interface OfferRerollSpec {
  heroId,
  diceTypes: DiceSpec
}

export function flow_offer_reroll(battle: BattleState, {heroId,diceTypes}:OfferRerollSpec): FlowInstruction {
  // wrap every reroll application with additional reroll question
  function withAccept(trgt: FlowTarget):FlowInstruction{
    return ['flow','all',[trgt,<FlowTarget>['flow', 'offerReroll', {heroId,diceTypes}]]];
  };
  let hero = battle.heroes[heroId];
  if (hero.vars.luck){
    let opts = {
      accept: undefined
    };
    if (diceTypes.attack || diceTypes.singleAttack){
      opts['atk die with '+hero.vars.attackDice[0]] = withAccept(['apply','reroll',{heroId,diceType:'attack'}]);
      if (!diceTypes.singleAttack) {
        opts['atk die with '+hero.vars.attackDice[1]] = withAccept(['apply','reroll',{heroId,diceType:'attack',second:true}]);
      }
    }
    if (diceTypes.defence){
      opts['atk die with '+hero.vars.defenceDice[0]] = withAccept(['apply','reroll',{heroId,diceType:'defence'}]);
      opts['atk die with '+hero.vars.defenceDice[1]] = withAccept(['apply','reroll',{heroId,diceType:'defence',second:true}]);
    }
    if (diceTypes.power){
      opts['pow die with '+hero.vars.powerDie] = withAccept(['apply','reroll',{heroId,diceType:'power'}]);
    }
    return <PoseQuestion>['question', {
      line: ['Will',{heroRef:heroId},'accept the result or spend luck to reroll a die?'],
      options: opts
    }];
  }
  return undefined;
}
