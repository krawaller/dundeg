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

export type ApplyAmbushResult = ['apply', 'ambushResult', AmbushResultSpec];
export type ApplyBloodCurseResult = ['apply', 'bloodCurseResult', BloodCurseSpec];
export type ApplyDaemonsBlood = ['apply', 'daemonsBlood', DaemonsBloodSpec];
export type ApplyDiceRemoval =  ['apply', 'diceRemoval', DiceRemovalSpec];
export type ApplyDiceRoll =   ['apply', 'diceRoll', DiceRollSpec];
export type ApplyDimwitResult = ['apply', 'dimwitResult', DimwitResultSpec];
export type ApplyEndRoundHero = ['apply', 'endRoundHero', EndOfRoundHeroSpec];
export type ApplyEndRoundMonster = ['apply', 'endRoundMonster', EndOfRoundMonsterSpec];
export type ApplyEscapeOutcome = ['apply', 'escapeOutcome', EscapeOutcomeSpec];
export type ApplyHeroTargetChoice = ['apply', 'heroTargetChoice', HeroTargetSelectionSpec];
export type ApplyIntroduceMonster = ['apply', 'introduceMonster', MonsterIntroductionSpec];
export type ApplyLogMessage = ['apply', 'log', LogMessage];
export type ApplyLuncheonTruncheonThrow = ['apply', 'luncheonTruncheonThrow', LuncheonTruncheonThrowSpec];
export type ApplyMonsterTargetChoice = ['apply', 'monsterTargetChoice', TargetSelectionForMonsterSpec];
export type ApplyQuestion = ['apply','question',Question];
export type ApplyRegisterTestOutcome = ['apply', 'registerTestOutcome', Test ];
export type ApplyReroll = ['apply', 'reroll', RerollSpec ];
export type ApplyReturnToBattle = ['apply', 'returnToBattle', ReturnToBattleSpec];
export type ApplyStanceChoice = ['apply', 'stanceChoice', ApplyStanceChoiceToHeroSpec];
export type ApplyWeaknessInvocationResult = ['apply', 'weaknessInvocationResult', WeaknessInvocationResultSpec];
export type ApplyWoundHero = ['apply', 'woundHero', WoundHeroSpec];
export type ApplyWoundMonster = ['apply', 'woundMonster', WoundMonsterSpec];

export type FlowApply = // When add stuff here, must also add to exec/exec_apply
  ApplyAmbushResult |
  ApplyBloodCurseResult |
  ApplyDaemonsBlood |
  ApplyDiceRemoval |
  ApplyDiceRoll |
  ApplyDimwitResult |
  ApplyEndRoundHero |
  ApplyEndRoundMonster |
  ApplyEscapeOutcome |
  ApplyHeroTargetChoice |
  ApplyIntroduceMonster |
  ApplyLogMessage |
  ApplyLuncheonTruncheonThrow |
  ApplyMonsterTargetChoice |
  ApplyQuestion |
  ApplyReroll |
  ApplyRegisterTestOutcome |
  ApplyReturnToBattle |
  ApplyStanceChoice |
  ApplyWeaknessInvocationResult |
  ApplyWoundHero |
  ApplyWoundMonster
  ;

// Flow specs
import { OfferRerollSpec } from '../flow/flow_offer_reroll';
import { EachHeroSpec } from '../flow/flow_each_hero';
import { EachMonsterSpec } from '../flow/flow_each_monster';
import { HeroOfferEscapeChoiceSpec } from '../flow/flow_hero_escape_choice';
import { HeroOfferReturnChoiceSpec } from '../flow/flow_hero_return_choice';
import { HeroOfferStanceChoiceSpec } from '../flow/flow_hero_stance_choice';
import { HeroTargetChoiceSpec } from '../flow/flow_hero_target_choice';
import { MonsterTargetChoiceSpec } from '../flow/flow_monster_target_choice';
import { MakeRollSpec } from '../flow/flow_dice_roll';
import { ThrowDaemonsBloodSpec } from '../flow/flow_daemons_blood';
import { InitiateAmbushSpec } from '../flow/flow_ambush';
import { MonsterEntrySpec } from '../flow/flow_monster_entry';
import { InitiateDimwitSpec } from '../flow/flow_dimwit';

export type FlowAll = ['flow','all', any[]];
export type FlowAmbush = ['flow','ambush', InitiateAmbushSpec];
export type FlowDaemonsBlood = ['flow','daemonsBlood', ThrowDaemonsBloodSpec];
export type FlowDiceRoll = ['flow','diceRoll', MakeRollSpec];
export type FlowDimwit = ['flow','dimwit', InitiateDimwitSpec];
export type FlowEscapeChoice = ['flow', 'escapeChoice', HeroOfferEscapeChoiceSpec];
export type FlowEachHero = ['flow', 'eachHero', EachHeroSpec];
export type FlowEachMonster = ['flow', 'eachMonster', EachMonsterSpec];
export type FlowHeroTargetChoice = ['flow', 'heroTargetChoice', HeroTargetChoiceSpec];
export type FlowMonsterEntry = ['flow', 'monsterEntry', MonsterEntrySpec];
export type FlowMonsterTargetChoice = ['flow', 'monsterTargetChoice', MonsterTargetChoiceSpec];
export type FlowOfferReroll = ['flow', 'offerReroll', OfferRerollSpec];
export type FlowPickTestPath = ['flow', 'pickTestPath', Test];
export type FlowReturnChoice = ['flow', 'returnChoice', HeroOfferReturnChoiceSpec];
export type FlowStanceChoice = ['flow', 'stanceChoice', HeroOfferStanceChoiceSpec];
export type FlowTest = ['flow', 'test', Test];


export type FlowFurther = // When add stuff here, must also add to exec/exec_flow
  FlowAll |
  FlowAmbush |
  FlowDaemonsBlood |
  FlowDiceRoll |
  FlowDimwit |
  FlowEscapeChoice |
  FlowEachHero |
  FlowEachMonster |
  FlowHeroTargetChoice |
  FlowMonsterEntry |
  FlowMonsterTargetChoice |
  FlowOfferReroll |
  FlowPickTestPath |
  FlowReturnChoice |
  FlowStanceChoice |
  FlowTest
  ;

// TODO - remove test?

export type FlowTarget = FlowApply | FlowFurther

export type FlowInstruction = FlowTarget | undefined;

export interface Test {
  heroId: HeroId,
  reason: StatCheckReason,
  stat: HeroStatName,
  dice: 'attack' | 'defence',
  line: LogMessageLine,
  success: FlowTarget,
  failure: FlowTarget
}

export interface Question {
  line: LogMessageLine
  options: {
    [idx: string]: FlowTarget
  }
};
