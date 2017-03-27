
import { MonsterDefinition } from './interfaces';

interface MonsterBook { [idx: string]: MonsterDefinition }

export const monsters: MonsterBook = {
  backAlleyBruiser: {
    name: 'Back Alley Bruiser',
    traits: { bandit: true },
    stats: {
      ATK: 4,
      ARM: 0,
      HP: 4
    },
    targets: 'STR-',
    value: 1
  },
  manAtArms: {
    name: 'Man-At-Arms',
    traits: { human: true, law: true, militant: true },
    stats: {
      ATK: 4,
      ARM: 2,
      HP: 4
    },
    targets: 'AGI+',
    value: 1
  },
  slitherFish: {
    name: 'Slither Fish',
    traits: {filth: true, fishoid: true, vermin: true},
    stats: {
      ATK: 3,
      ARM: 2,
      HP: 3
    },
    targets: 'CON+',
    value: 1
  },
  swampTroll: {
    name: 'Swamp Troll',
    traits: {filth: true},
    stats: {
      ATK: 6,
      ARM: 0,
      HP: 12
    },
    targets: 'STR+',
    value: 2
  },
  shambler: {
    name: 'Shambler',
    traits: {filth: true},
    stats: {
      ATK: 6,
      ARM: 0,
      HP: 12
    },
    targets: 'PER+',
    value: 3
  }
}
