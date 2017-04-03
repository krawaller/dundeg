import { LogMessage, LogMessageLine, StatCheckReason } from './mixed_interfaces';
import { HeroId, HeroStatName } from './hero_interfaces';

// Application specs
import { ReturnToBattleSpec } from '../apply/apply_return_to_battle';
import { ApplyStanceChoiceToHeroSpec } from '../apply/apply_stance_choice_to_hero';
import { RerollSpec } from '../apply/apply_reroll';
import { TargetSelectionForMonsterSpec } from '../apply/apply_target_selection_for_monster';
import { HeroTargetSelectionSpec } from '../apply/apply_target_selection_for_hero';
import { DiceRemovalSpec } from '../apply/apply_dice_removal';
import { EscapeOutcomeSpec } from '../apply/apply_escape_outcome';

// Flow specs
import { OfferRerollSpec } from '../flow/flow_offer_reroll';

export type FlowTarget =
  ['apply', 'stanceChoice', ApplyStanceChoiceToHeroSpec] |
  ['apply', 'returnToBattle', ReturnToBattleSpec] |
  ['apply', 'monsterTargetChoice', TargetSelectionForMonsterSpec] |
  ['apply', 'heroTargetChoice', HeroTargetSelectionSpec] |
  ['apply', 'reroll', RerollSpec ] |
  ['apply', 'diceRemoval', DiceRemovalSpec] |
  ['apply', 'escapeOutcome', EscapeOutcomeSpec] |
  ['apply', 'log', LogMessage] |
  ['flow', 'reroll', OfferRerollSpec] | 
  ['ask', Question] | 
  ['test', Test];

export type FlowInstruction =
  FlowTarget |
  ['all', FlowTarget[]] |
  ['eachHero', FlowTarget, any]
  undefined;

export interface Question {
  line: LogMessageLine
  options: {
    [idx: string]: FlowTarget
  }
};

export interface Test {
  heroId: HeroId,
  reason: StatCheckReason,
  stat: HeroStatName,
  dice: 'attack' | 'defence',
  line: LogMessageLine,
  success: FlowTarget,
  failure: FlowTarget
}

