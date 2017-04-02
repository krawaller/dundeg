import { LogMessageLine } from './mixed_interfaces';


import { ApplyReturnToHeroSpec } from '../apply/apply_return_to_hero';
import { ApplyStanceChoiceToHeroSpec } from '../apply/apply_stance_choice_to_hero';
import { RerollSpec } from '../apply/apply_reroll';

export type FlowTarget =
  ['apply', 'stanceChoice', ApplyStanceChoiceToHeroSpec] |
  ['apply', 'heroReturn', ApplyReturnToHeroSpec] |
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
