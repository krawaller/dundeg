import { FlowApply, BattleState, LogMessage, Question, Test } from '../interfaces';

import { apply_ambush_result, AmbushResultSpec } from '../apply/apply_ambush_result';
import { apply_dimwit_result, DimwitResultSpec } from '../apply/apply_dimwit_result';
import { apply_stance_choice_to_hero, ApplyStanceChoiceToHeroSpec } from '../apply/apply_stance_choice_to_hero';
import { apply_return_to_battle, ReturnToBattleSpec } from '../apply/apply_return_to_battle';
import { apply_target_selection_for_monster, TargetSelectionForMonsterSpec } from '../apply/apply_target_selection_for_monster';
import { apply_target_selection_for_hero, HeroTargetSelectionSpec } from '../apply/apply_target_selection_for_hero';
import { apply_reroll, RerollSpec } from '../apply/apply_reroll';
import { apply_dice_removal, DiceRemovalSpec } from '../apply/apply_dice_removal';
import { apply_escape_outcome_to_hero, EscapeOutcomeSpec } from '../apply/apply_escape_outcome';
import { apply_log } from '../apply/apply_log';
import { apply_luncheon_truncheon_throw, LuncheonTruncheonThrowSpec } from '../apply/apply_luncheon_truncheon_throw';
import { apply_blood_curse_invocation_result, BloodCurseSpec } from '../apply/apply_blood_curse_invocation_result';
import { apply_weakness_invocation_result, WeaknessInvocationResultSpec } from '../apply/apply_weakness_invocation_result';
import { apply_daemons_blood, DaemonsBloodSpec } from '../apply/apply_daemons_blood';
import { apply_dice_roll, DiceRollSpec } from '../apply/apply_dice_roll';
import { apply_end_of_round_to_hero, EndOfRoundHeroSpec } from '../apply/apply_end_of_round_to_hero';
import { apply_end_of_round_to_monster, EndOfRoundMonsterSpec } from '../apply/apply_end_of_round_to_monster';
import { apply_introduction_to_monster, MonsterIntroductionSpec } from '../apply/apply_introduction_to_monster';
import { apply_wounds_to_hero, WoundHeroSpec } from '../apply/apply_wounds_to_hero';
import { apply_wounds_to_monster, WoundMonsterSpec } from '../apply/apply_wounds_to_monster';
import { apply_question } from '../apply/apply_question';
import { apply_register_test_outcome } from '../apply/apply_register_test_outcome';


export function exec_apply(battle:BattleState, [,what,spec]:FlowApply): BattleState{
  switch(what){
    case 'ambushResult': return apply_ambush_result(battle, <AmbushResultSpec>spec);
    case 'bloodCurseResult': return apply_blood_curse_invocation_result(battle, <BloodCurseSpec>spec);
    case 'daemonsBlood': return apply_daemons_blood(battle, <DaemonsBloodSpec>spec);
    case 'diceRemoval': return apply_dice_removal(battle, <DiceRemovalSpec>spec);
    case 'diceRoll': return apply_dice_roll(battle, <DiceRollSpec>spec);
    case 'dimwitResult': return apply_dimwit_result(battle, <DimwitResultSpec>spec);
    case 'endRoundHero': return apply_end_of_round_to_hero(battle, <EndOfRoundHeroSpec>spec);
    case 'endRoundMonster': return apply_end_of_round_to_monster(battle, <EndOfRoundMonsterSpec>spec);
    case 'escapeOutcome': return apply_escape_outcome_to_hero(battle, <EscapeOutcomeSpec>spec);
    case 'heroTargetChoice': return apply_target_selection_for_hero(battle, <HeroTargetSelectionSpec>spec);
    case 'introduceMonster': return apply_introduction_to_monster(battle, <MonsterIntroductionSpec>spec);
    case 'log': return apply_log(battle, <LogMessage>spec);
    case 'luncheonTruncheonThrow': return apply_luncheon_truncheon_throw(battle, <LuncheonTruncheonThrowSpec>spec);
    case 'monsterTargetChoice': return apply_target_selection_for_monster(battle, <TargetSelectionForMonsterSpec>spec);
    case 'question': return  apply_question(battle, <Question>spec);
    case 'registerTestOutcome': return apply_register_test_outcome(battle, <Test>spec);
    case 'reroll': return apply_reroll(battle, <RerollSpec>spec);
    case 'returnToBattle': return apply_return_to_battle(battle, <ReturnToBattleSpec>spec);
    case 'stanceChoice': return apply_stance_choice_to_hero(battle, <ApplyStanceChoiceToHeroSpec>spec);
    case 'weaknessInvocationResult': return apply_weakness_invocation_result(battle, <WeaknessInvocationResultSpec>spec);
    case 'woundHero': return apply_wounds_to_hero(battle, <WoundHeroSpec>spec);
    case 'woundMonster': return apply_wounds_to_monster(battle, <WoundMonsterSpec>spec);
    default:
      console.log("WHat the eff?!", what, spec);
      throw 'Unknown application: '+what;
  }
}
