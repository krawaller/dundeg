let mapValues = require('lodash/mapValues');

import { BattleState, HeroId, FlowInstruction, FlowTest } from '../interfaces';

import { find_hero_actions } from '../find/find_hero_actions';
import { find_hero_attack_options } from '../find/find_hero_attack_options';

export interface SelectActionSpec {
  heroId: HeroId
}

export function flow_select_action(battle: BattleState, {heroId}:SelectActionSpec): FlowInstruction {
  let actions = find_hero_actions(battle, {heroId});
  let attacks = mapValues(find_hero_attack_options(battle, {heroId}),attack => ['flow','all',[
    <FlowInstruction>['apply','registerActionSelection',{heroId,action:<FlowInstruction>['flow','performHeroAttack',{heroId,attack}]}],
    <FlowInstruction>['flow','heroTargetChoice',{heroId}]
  ]]);
  return ['apply','question',{
    line: ['Select action for',{heroRef:heroId}],
    options: Object.assign({},actions,attacks)
  }];
}
