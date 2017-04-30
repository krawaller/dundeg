import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, ApplyQuestion } from '../interfaces';

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
    (hero.vars.attackDice||[]).forEach((die,n)=>{
      opts['atk die with '+hero.vars.attackDice[n]] = withAccept(<FlowTarget>['apply','reroll',{heroId,diceType:'attack',index:n}]);
    });
    (hero.vars.defenceDice||[]).forEach((die,n)=>{
      opts['def die with '+hero.vars.defenceDice[n]] = withAccept(<FlowTarget>['apply','reroll',{heroId,diceType:'defence',index:n}]);
    });
    (hero.vars.powerDice||[]).forEach((die,n)=>{
      opts['pow die with '+hero.vars.powerDice[n]] = withAccept(<FlowTarget>['apply','reroll',{heroId,diceType:'power',index:n}]);
    });
    return <ApplyQuestion>['apply','question', {
      line: ['Will',{heroRef:heroId},'accept the result or spend luck to reroll a die?'],
      options: opts
    }];
  }
  return undefined;
}
