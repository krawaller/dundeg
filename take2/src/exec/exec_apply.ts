import { FlowApply, BattleState, LogMessage } from '../interfaces';

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

export function exec_apply(battle:BattleState, [,what,spec]:FlowApply): BattleState{
  switch(what){
    case 'ambushResult': return apply_ambush_result(battle, <AmbushResultSpec>spec);
    case 'diceRemoval': return apply_dice_removal(battle, <DiceRemovalSpec>spec);
    case 'dimwitResult': return apply_dimwit_result(battle, <DimwitResultSpec>spec);
    case 'escapeOutcome': return apply_escape_outcome_to_hero(battle, <EscapeOutcomeSpec>spec);
    case 'heroTargetChoice': return apply_target_selection_for_hero(battle, <HeroTargetSelectionSpec>spec);
    case 'log': return apply_log(battle, <LogMessage>spec);
    case 'luncheonTruncheonThrow': return apply_luncheon_truncheon_throw(battle, <LuncheonTruncheonThrowSpec>spec);
    case 'monsterTargetChoice': return apply_target_selection_for_monster(battle, <TargetSelectionForMonsterSpec>spec);
    case 'reroll': return apply_reroll(battle, <RerollSpec>spec);
    case 'returnToBattle': return apply_return_to_battle(battle, <ReturnToBattleSpec>spec);
    case 'stanceChoice': return apply_stance_choice_to_hero(battle, <ApplyStanceChoiceToHeroSpec>spec);
  }
}
