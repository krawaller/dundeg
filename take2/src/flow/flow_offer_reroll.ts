import { BattleState, MonsterId, FlowInstruction, FlowTarget } from '../interfaces';

export interface OfferRerollSpec {
  heroId
}

export function flow_offer_reroll(battle: BattleState, {heroId}:OfferRerollSpec): FlowInstruction {
  let hero = battle.heroes[heroId];
  if (hero.vars.luck){
    let opts = {
      accept: undefined
    };
    if (hero.vars.attackDice){
      opts['atk die with '+hero.vars.attackDice[0]] = <FlowTarget>['apply','reroll',{heroId,diceType:'attack'}];
      opts['atk die with '+hero.vars.attackDice[1]] = <FlowTarget>['apply','reroll',{heroId,diceType:'attack',second:true}];
    }
    if (hero.vars.defenceDice){
      opts['atk die with '+hero.vars.defenceDice[0]] = <FlowTarget>['apply','reroll',{heroId,diceType:'defence'}];
      opts['atk die with '+hero.vars.defenceDice[1]] = <FlowTarget>['apply','reroll',{heroId,diceType:'defence',second:true}];
    }
    if (hero.vars.powerDie){
      opts['pow die with '+hero.vars.powerDie] = <FlowTarget>['apply','reroll',{heroId,diceType:'power'}];
    }
    return ['ask', {
      line: ['Will',{heroRef:heroId},'accept the result or spend luck to reroll?'],
      options: opts
    }];
  }
  return undefined;
}
