import { LogMessage, LogMessageLine, StatCheckReason } from './mixed_interfaces';
import { HeroId, HeroStatName } from './hero_interfaces';
import { MonsterId } from './monster_interfaces';

// Application specs
import { ReturnToBattleSpec } from '../apply/apply_return_to_battle';
import { ApplyStanceChoiceToHeroSpec } from '../apply/apply_stance_choice_to_hero';
import { RerollSpec } from '../apply/apply_reroll';
import { TargetSelectionForMonsterSpec } from '../apply/apply_target_selection_for_monster';
import { HeroTargetSelectionSpec } from '../apply/apply_target_selection_for_hero';
import { DiceRemovalSpec } from '../apply/apply_dice_removal';
import { EscapeOutcomeSpec } from '../apply/apply_escape_outcome';
import { AmbushResultSpec } from '../apply/apply_ambush_result';
import { DimwitResultSpec } from '../apply/apply_dimwit_result';
import { LuncheonTruncheonThrowSpec } from '../apply/apply_luncheon_truncheon_throw';

// Flow specs
import { OfferRerollSpec } from '../flow/flow_offer_reroll';

export type FlowApply = // When add stuff here, must also add to exec/exec_apply
  ['apply', 'ambushResult', AmbushResultSpec] |
  ['apply', 'diceRemoval', DiceRemovalSpec] |
  ['apply', 'dimwitResult', DimwitResultSpec] |
  ['apply', 'escapeOutcome', EscapeOutcomeSpec] |
  ['apply', 'heroTargetChoice', HeroTargetSelectionSpec] |
  ['apply', 'log', LogMessage] |
  ['apply', 'luncheonTruncheonThrow', LuncheonTruncheonThrowSpec] |
  ['apply', 'monsterTargetChoice', TargetSelectionForMonsterSpec] |
  ['apply', 'reroll', RerollSpec ] |
  ['apply', 'returnToBattle', ReturnToBattleSpec] |
  ['apply', 'stanceChoice', ApplyStanceChoiceToHeroSpec]
  ;

export type FlowFurther = 
  ['flow', 'reroll', OfferRerollSpec] | 
  ['flow', 'ask', Question] | 
  ['flow', 'test', Test];

export type FlowTarget = FlowApply | FlowFurther

export type FlowInstruction =
  FlowTarget |
  ['all', FlowTarget[]] |
  ['pickTargetAnd', any, | FlowTarget] | // targetpick config
  ['eachHero', (heroId:HeroId) => FlowTarget] |
  ['eachMonster', (monsterId:MonsterId) => FlowTarget] |
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
  success: (num: number) => FlowTarget,
  failure: FlowTarget
}

