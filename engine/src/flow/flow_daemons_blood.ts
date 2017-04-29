import { BattleState, FlowInstruction, HeroId, FlowDiceRoll, ApplyDaemonsBlood } from '../interfaces';

export interface ThrowDaemonsBloodSpec {
  heroId: HeroId
}

export function flow_daemons_blood(battle: BattleState, {heroId}:ThrowDaemonsBloodSpec): FlowInstruction {
  return ['flow','all',[
    //<FlowInstruction>['flow','heroTargetChoice',{heroId}], // Targetting moved to action selection
    <FlowDiceRoll>['flow','diceRoll',{heroId, diceTypes: {singleAttack:true}, line: ['Roll for Daemon\'s Blood damage vs',{monsterRef:battle.heroes[heroId].vars.target}] }],
    <ApplyDaemonsBlood>['apply','daemonsBlood',{heroId}]
  ]];
}
