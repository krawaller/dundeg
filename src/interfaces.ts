
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
  startingSkills: skillId[],
  startingItems: itemId[],
  stats: Stats
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

export type entityType = 'item' | 'state' | 'skill'

export interface Entity {
  id: string,
  type: entityType,
  hooks: {
    [p: string]: promiseMaker
  }
}

export interface EntityCollection {
  [key: string]: Entity
}

export type promiseMaker = (hook: hookId) => Promise<any> | undefined
