import { BattleState, FlowFurther, FlowInstruction, Test } from '../interfaces';

import { flow_dice_roll, MakeRollSpec } from '../flow/flow_dice_roll';
import { flow_hero_escape, HeroEscapeSpec } from '../flow/flow_hero_escape';
import { flow_each_hero, EachHeroSpec } from '../flow/flow_each_hero';
import { flow_each_monster, EachMonsterSpec } from '../flow/flow_each_monster';
import { flow_hero_target_choice, HeroTargetChoiceSpec } from '../flow/flow_hero_target_choice';
import { flow_monster_target_choice, MonsterTargetChoiceSpec } from '../flow/flow_monster_target_choice';
import { flow_offer_reroll, OfferRerollSpec } from '../flow/flow_offer_reroll';
import { flow_pick_test_path } from '../flow/flow_pick_test_path';
import { flow_test } from '../flow/flow_test';
import { flow_hero_offer_stance_choice, HeroOfferStanceChoiceSpec } from '../flow/flow_hero_stance_choice';
import { flow_hero_offer_return_choice, HeroOfferReturnChoiceSpec } from '../flow/flow_hero_return_choice';
import { flow_daemons_blood, ThrowDaemonsBloodSpec } from '../flow/flow_daemons_blood';
import { flow_monster_entry, MonsterEntrySpec } from '../flow/flow_monster_entry';
import { flow_ambush, InitiateAmbushSpec } from '../flow/flow_ambush';
import { flow_dimwit, InitiateDimwitSpec } from '../flow/flow_dimwit';
import { flow_weakness, InitiateWeakness } from '../flow/flow_weakness';
import { flow_bloodcurse, InitiateBloodCurseSpec } from '../flow/flow_bloodcurse';
import { flow_wound_monster, InitiateWoundMonsterSpec } from '../flow/flow_wound_monster';
import { flow_throw_shrapnel_bomb, ThrowShrapnelBombSpec, flow_detonate_shrapnel_bomb, DetonateShrapnelBombSpec } from '../flow/flow_shrapnel_bomb';
import { flow_flash_bomb, FlashBombSpec } from '../flow/flow_flash_bomb';
import { flow_perform_hero_attack, PerformHeroAttackSpec } from '../flow/flow_perform_hero_attack';
import { flow_perform_monster_attack, PerformMonsterAttackSpec } from '../flow/flow_perform_monster_attack';
import { flow_battle_dice, BattleDiceSpec } from '../flow/flow_battle_dice';
import { flow_player_round, PlayerRoundSpec } from '../flow/flow_player_round';
import { flow_round_end } from '../flow/flow_round_end';
import { flow_next_player } from '../flow/flow_next_player';
import { flow_bash_player, BashPlayerSpec } from '../flow/flow_bash_player';
import { flow_new_round } from '../flow/flow_new_round';
import { flow_win_game } from '../flow/flow_win_game';
import { flow_lose_game } from '../flow/flow_lose_game';
import { flow_execute_action, ExecuteActionSpec } from '../flow/flow_execute_action';
import { flow_select_action, SelectActionSpec } from '../flow/flow_select_action';
import { flow_initiate_monster_attack, InitiateMonsterAttackSpec } from '../flow/flow_initiate_monster_attack';
import { flow_begin_battle } from '../flow/flow_begin_battle';
import { flow_each_escaped_hero, EachEscapedHeroSpec } from '../flow/flow_each_escaped_hero';


export function exec_flow(battle:BattleState, [,what,spec]:FlowFurther):BattleState{
  let newInstr: FlowInstruction;
  switch(what){
    // Special ALL case, fix and return from here
    case 'all': return {...battle, stack: (<FlowInstruction[]>spec).concat(battle.stack || [])};
    // All others just give back 1 new instruction
    case 'ambush': newInstr = flow_ambush(battle, <InitiateAmbushSpec>spec); break;
    case 'bashPlayer': newInstr = flow_bash_player(battle, <BashPlayerSpec>spec); break;
    case 'battleDice': newInstr = flow_battle_dice(battle, <BattleDiceSpec>spec); break;
    case 'beginBattle': newInstr = flow_begin_battle(battle, spec); break;
    case 'bloodCurse': newInstr = flow_bloodcurse(battle, <InitiateBloodCurseSpec>spec); break;
    case 'daemonsBlood': newInstr = flow_daemons_blood(battle, <ThrowDaemonsBloodSpec>spec); break;
    case 'detonateShrapnelBomb': newInstr = flow_detonate_shrapnel_bomb(battle, <DetonateShrapnelBombSpec>spec); break;
    case 'diceRoll': newInstr = flow_dice_roll(battle, <MakeRollSpec>spec); break;
    case 'dimwit': newInstr = flow_dimwit(battle, <InitiateDimwitSpec>spec); break;
    case 'eachEscapedHero': newInstr = flow_each_escaped_hero(battle, <EachEscapedHeroSpec>spec); break;
    case 'eachHero': newInstr = flow_each_hero(battle, <EachHeroSpec>spec); break;
    case 'eachMonster': newInstr = flow_each_monster(battle, <EachMonsterSpec>spec); break;
    case 'escape': newInstr = flow_hero_escape(battle, <HeroEscapeSpec>spec); break;
    case 'executeAction': newInstr = flow_execute_action(battle, <ExecuteActionSpec>spec); break;
    case 'flashBomb': newInstr = flow_flash_bomb(battle, <FlashBombSpec>spec); break;
    case 'heroTargetChoice': newInstr = flow_hero_target_choice(battle, <HeroTargetChoiceSpec>spec); break;
    case 'initiateMonsterAttack': newInstr = flow_initiate_monster_attack(battle, <InitiateMonsterAttackSpec>spec); break;
    case 'loseGame': newInstr = flow_lose_game(battle,<any>spec); break;
    case 'monsterEntry': newInstr = flow_monster_entry(battle, <MonsterEntrySpec>spec); break;
    case 'monsterTargetChoice': newInstr = flow_monster_target_choice(battle,<MonsterTargetChoiceSpec>spec); break;
    case 'newRound': newInstr = flow_new_round(battle, <any>spec); break;
    case 'nextPlayer': newInstr = flow_next_player(battle, <any>spec); break;
    case 'offerReroll': newInstr = flow_offer_reroll(battle, <OfferRerollSpec>spec); break;
    case 'performHeroAttack': newInstr = flow_perform_hero_attack(battle, <PerformHeroAttackSpec>spec); break;
    case 'performMonsterAttack': newInstr = flow_perform_monster_attack(battle, <PerformMonsterAttackSpec>spec); break;
    case 'playerRound': newInstr = flow_player_round(battle, <PlayerRoundSpec>spec); break;
    case 'pickTestPath': newInstr = flow_pick_test_path(battle, <Test>spec); break;
    case 'returnChoice': newInstr = flow_hero_offer_return_choice(battle, <HeroOfferReturnChoiceSpec>spec); break;
    case 'roundEnd': newInstr = flow_round_end(battle, <any>spec); break;
    case 'throwShrapnelBomb': newInstr = flow_throw_shrapnel_bomb(battle, <ThrowShrapnelBombSpec>spec); break;
    case 'selectAction': newInstr = flow_select_action(battle, <SelectActionSpec>spec); break;
    case 'stanceChoice': newInstr = flow_hero_offer_stance_choice(battle, <HeroOfferStanceChoiceSpec>spec); break;
    case 'test': newInstr = flow_test(battle, <Test>spec); break;
    case 'weakness': newInstr = flow_weakness(battle, <InitiateWeakness>spec); break;
    case 'winGame': newInstr = flow_win_game(battle,<any>spec); break;
    case 'woundMonster': newInstr = flow_wound_monster(battle, <InitiateWoundMonsterSpec>spec); break;
    default: throw 'Unknown flow: '+what;
  }
  if (!newInstr){
    return battle;
  }
  return {...battle, stack: [newInstr].concat(battle.stack || [])};
}
