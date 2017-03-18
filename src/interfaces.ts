import { World } from './world'

export type skillId = 'foekiller' | 'something';

export type itemId = 'spikedgauntlet' | 'warpaint';

export type stateId = 'poisoned'

export interface Stats {
  AGI: number,
  CON: number,
  MAG: number,
  MRL: number,
  PER: number,
  STR: number
}

export interface StartingHero {
  id: string,
  name: string,
  startingSkills: string[],
  startingItems: string[],
  stats: Stats
}

export interface MonsterDefinition {
  name: string
  stats: any
  traits: any
  targets: string
}

export interface Hero {
  id: string,
  name: string,
  skills: {
    [key: string]: Entity
  },
  items: {
    [key: string]: Entity
  },
  states: {
    [key: string]: Entity
  },
  stats: Stats
}

export type hookId = 'calculate_stat' | 'something_else'

export type entityType = string; // 'item' | 'state' | 'skill' | 'hero' | 'monster'

export interface Entity {
  id?: string
  type: entityType
  name: string
  props?: Object
  state?: Object
  hooks: {
    [p: string]: promiseMaker
  }
}

export interface EntityCollection {
  [key: string]: Entity
}

export type promiseMaker = (e: any, w: World) => any
