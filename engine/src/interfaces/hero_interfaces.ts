import { Inventory, ItemName } from './item_interfaces';
import { FlowInstruction } from './flow_interfaces';
import { MonsterId } from './monster_interfaces';

export interface HeroStats {
  AGI: number,
  CON: number,
  MAG: number,
  MRL: number,
  PER: number,
  STR: number
}

export type HeroStatName = keyof HeroStats;

export interface HeroDefinition {
  name: string,
  skills: HeroSkillName[],
  items: ItemName[],
  stats: HeroStats
}

export type HeroStance = 'assault' | 'guard';

export interface HeroVars {
  stance?: HeroStance
  ATK?: number
  powerDice?: number[]
  attackDice?: number[]
  defenceDice?: number[]
  failedDefence?: true
  failedEscape?: true
  usePowForDefence?: number
  usedPowerDice?: boolean[]
  knockedOutBy?: MonsterId
  hasActed?: true
  escaped?: true
  HP?: number
  gold?: number
  bloodCurseLink?: MonsterId
  target?: MonsterId
  luck?: number
  testOutcome?: number
  action?: FlowInstruction
}

export interface HeroState {
  blueprint?: HeroBase
  vars?: HeroVars
  states?: HeroStates
  items?: Inventory
  skills?: HeroSkills
}

export type HeroBase = 'angelOfDeath' | 'bloodsportBrawler' | 'carnivalDrifter' | 'hinterLander' | 'infamousButcher' | 'soldierOfFortune';

export type HeroSkillName = keyof HeroSkills;

export interface HeroSkills {
  backStab?: true
  bloodCurse?: true
  bloodLust?: true
  exterminator?: true
  fieldCraft?: true
  findWeakness?: true
  foeKiller?: true
  gourmet?: true
  martialDiscipline?: true
  performance?: true
  rage?: true
  sixthSense?: true
  sneakAttack?: true
}

export interface HeroSkillBook {
  backStab: HeroSkillDef
  bloodCurse: HeroSkillDef
  bloodLust: HeroSkillDef
  exterminator: HeroSkillDef
  fieldCraft: HeroSkillDef
  findWeakness: HeroSkillDef
  foeKiller: HeroSkillDef
  gourmet: HeroSkillDef
  martialDiscipline: HeroSkillDef
  performance: HeroSkillDef
  rage: HeroSkillDef
  sixthSense: HeroSkillDef
  sneakAttack: HeroSkillDef
}

export interface HeroSkillDef {
  name: string
  actions?: HeroSkillActions
  description: string
}

export interface HeroSkillActions {
  findWeakness?: string
  castBloodCurse?: string
}

export type HeroStateName = keyof HeroStates;

export interface HeroStates {
  blessed?: true
  blinded?: true
  exalted?: true
  infected?: true
  poisoned?: true
  stunned?: true
  focused?: true
}

export type HeroId = string;
