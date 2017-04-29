let mapValues = require('lodash/mapValues');

import { BattleState, HeroId, FlowInstruction, FlowTest } from '../interfaces';

import { find_hero_actions } from '../find/find_hero_actions';
import { find_hero_attack_options } from '../find/find_hero_attack_options';
import { registerAndTarget } from '../utils/helpers';

export interface SelectActionSpec {
  heroId: HeroId
}

export function flow_select_action(battle: BattleState, {heroId}:SelectActionSpec): FlowInstruction {
  let actions = find_hero_actions(battle, {heroId});
  let attacks = mapValues(find_hero_attack_options(battle, {heroId}),attack => registerAndTarget(heroId,['flow','performHeroAttack',{heroId,attack}],['Who should',{heroRef:heroId},'target with',{itemRef:attack.using},attack.type+' attack?']));
  return ['apply','question',{
    line: ['Select action for',{heroRef:heroId}],
    options: Object.assign({},actions,attacks)
  }];
}
