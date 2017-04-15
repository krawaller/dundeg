import { BattleState, FlowFurther, FlowInstruction, Test } from '../interfaces';

import { flow_dice_roll, MakeRollSpec } from '../flow/flow_dice_roll';
import { flow_hero_offer_escape_choice, HeroOfferEscapeChoiceSpec } from '../flow/flow_hero_escape_choice';
import { flow_each_hero, EachHeroSpec } from '../flow/flow_each_hero';
import { flow_each_monster, EachMonsterSpec } from '../flow/flow_each_monster';
import { flow_hero_target_choice, HeroTargetChoiceSpec } from '../flow/flow_hero_target_choice';
import { flow_monster_target_choice, MonsterTargetChoiceSpec } from '../flow/flow_monster_target_choice';
import { flow_offer_reroll, OfferRerollSpec } from '../flow/flow_offer_reroll';
import { flow_pick_test_path } from '../flow/flow_pick_test_path';
import { flow_test } from '../flow/flow_test';
import { flow_hero_offer_stance_choice, HeroOfferStanceChoiceSpec } from '../flow/flow_hero_stance_choice';
import { flow_hero_offer_return_choice, HeroOfferReturnChoiceSpec } from '../flow/flow_hero_return_choice';

export function exec_flow(battle:BattleState, [,what,spec]:FlowFurther):BattleState{
  let newStack: FlowInstruction | FlowInstruction[];
  switch(what){
    case 'all': newStack = <FlowInstruction[]>spec; break;
    case 'diceRoll': newStack = flow_dice_roll(battle, <MakeRollSpec>spec); break;
    case 'escapeChoice': newStack = flow_hero_offer_escape_choice(battle, <HeroOfferEscapeChoiceSpec>spec); break;
    case 'eachHero': newStack = flow_each_hero(battle, <EachHeroSpec>spec); break;
    case 'eachMonster': newStack = flow_each_monster(battle, <EachMonsterSpec>spec); break;
    case 'heroTargetChoice': newStack = flow_hero_target_choice(battle, <HeroTargetChoiceSpec>spec); break;
    case 'monsterTargetChoice': newStack = flow_monster_target_choice(battle,<MonsterTargetChoiceSpec>spec); break;
    case 'offerReroll': newStack = flow_offer_reroll(battle, <OfferRerollSpec>spec); break;
    case 'pickTestPath': newStack = flow_pick_test_path(battle, <Test>spec); break;
    case 'returnChoice': newStack = flow_hero_offer_return_choice(battle, <HeroOfferReturnChoiceSpec>spec); break;
    case 'stanceChoice': newStack = flow_hero_offer_stance_choice(battle, <HeroOfferStanceChoiceSpec>spec); break;
    case 'test': newStack = flow_test(battle, <Test>spec); break;
    default: throw 'Unknown flow: '+what;
  }
  return {...battle, stack: [].concat(newStack).concat(battle.stack || [])};
}
