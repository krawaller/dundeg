import { LogMessageLine } from './mixed_interfaces';


import { ReturnToBattleSpec } from '../apply/apply_return_to_battle';
import { ApplyStanceChoiceToHeroSpec } from '../apply/apply_stance_choice_to_hero';
import { RerollSpec } from '../apply/apply_reroll';

export type FlowTarget =
  ['apply', 'stanceChoice', ApplyStanceChoiceToHeroSpec] |
  ['apply', 'returnToBattle', ReturnToBattleSpec] |
  ['apply', 'reroll', RerollSpec ] |
  ['ask', Question];

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

export type StackItem = any;
