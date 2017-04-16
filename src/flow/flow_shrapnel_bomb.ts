import { BattleState, CalculationResult, HeroId, MonsterId, FlowInstruction, FlowDiceRoll, FlowDetonateShrapnelBomb, Attack, ApplyRemoveItem  } from '../interfaces';

import { calculate_wounds_vs_monster } from '../calculate/calculate_wounds_vs_monster';


export interface ThrowShrapnelBombSpec {
  heroId: HeroId
}

export function flow_throw_shrapnel_bomb(battle: BattleState, {heroId}:ThrowShrapnelBombSpec): FlowInstruction {
  return ['flow','all',[
    ['flow','eachMonster', monsterId => ['flow','all',[
      <FlowDiceRoll>['flow','diceRoll',{heroId, diceTypes: {singleAttack: true}}],
      <FlowDetonateShrapnelBomb>['flow','detonateShrapnelBomb',{heroId,monsterId}]
    ]]],
    <ApplyRemoveItem>['apply', 'removeItem', {heroId, item: 'shrapnelBomb'}]
  ]];
}


export interface DetonateShrapnelBombSpec {
  heroId: HeroId
  monsterId: MonsterId
}

export function flow_detonate_shrapnel_bomb(battle: BattleState, {heroId,monsterId}:DetonateShrapnelBombSpec): FlowInstruction {
  let die = battle.heroes[heroId].vars.attackDice[0];
  let damage: CalculationResult = {
    history: ['Shrapnel Bomb deals D3+1 damage', Math.ceil(die/2)+1],
    value: Math.ceil(die/2)+1
  }
  let attack:Attack = {type: 'special', using: 'shrapnelBomb'};
  let wounds = calculate_wounds_vs_monster(battle, {heroId, monsterId, damage, attack });
  return ['flow','woundMonster', { monsterId, heroId, wounds }];
}