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
import { BloodCurseSpec } from '../apply/apply_blood_curse_invocation_result';
import { WeaknessInvocationResultSpec } from '../apply/apply_weakness_invocation_result';
import { DaemonsBloodSpec } from '../apply/apply_daemons_blood';
import { DiceRollSpec } from '../apply/apply_dice_roll';
import { EndOfRoundHeroSpec } from '../apply/apply_end_of_round_to_hero';
import { EndOfRoundMonsterSpec } from '../apply/apply_end_of_round_to_monster';
import { MonsterIntroductionSpec } from '../apply/apply_introduction_to_monster';
import { WoundHeroSpec } from '../apply/apply_wounds_to_hero';
import { WoundMonsterSpec } from '../apply/apply_wounds_to_monster';

// Flow specs
import { OfferRerollSpec } from '../flow/flow_offer_reroll';

export type FlowApply = // When add stuff here, must also add to exec/exec_apply
  ['apply', 'ambushResult', AmbushResultSpec] |
  ['apply', 'bloodCurseResult', BloodCurseSpec] |
  ['apply', 'daemonsBlood', DaemonsBloodSpec] |
  ['apply', 'diceRemoval', DiceRemovalSpec] |
  ['apply', 'diceRoll', DiceRollSpec] |
  ['apply', 'dimwitResult', DimwitResultSpec] |
  ['apply', 'endRoundHero', EndOfRoundHeroSpec] |
  ['apply', 'endRoundMonster', EndOfRoundMonsterSpec] |
  ['apply', 'escapeOutcome', EscapeOutcomeSpec] |
  ['apply', 'heroTargetChoice', HeroTargetSelectionSpec] |
  ['apply', 'introduceMonster', MonsterIntroductionSpec] |
  ['apply', 'log', LogMessage] |
  ['apply', 'luncheonTruncheonThrow', LuncheonTruncheonThrowSpec] |
  ['apply', 'monsterTargetChoice', TargetSelectionForMonsterSpec] |
  ['apply', 'reroll', RerollSpec ] |
  ['apply', 'returnToBattle', ReturnToBattleSpec] |
  ['apply', 'stanceChoice', ApplyStanceChoiceToHeroSpec] |
  ['apply', 'weaknessInvocationResult', WeaknessInvocationResultSpec] |
  ['apply', 'woundHero', WoundHeroSpec] |
  ['apply', 'WoundMonster', WoundMonsterSpec]
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

