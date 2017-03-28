
import { MonsterDefinition } from '../interfaces';

interface MonsterBook { [idx: string]: MonsterDefinition }

export const monsters: MonsterBook = {
  _fierceTestMonster: {
    name: 'Debug monster - fierce',
    traits: {},
    stats: {
      ATK: 3,
      ARM: 3,
      HP: 3
    },
    targets: 'CON+',
    value: 1,
    skills: {
      fierce: true
    }
  },
  backAlleyBruiser: {
    name: 'Back Alley Bruiser',
    traits: { bandit: true },
    stats: {
      ATK: 4,
      ARM: 0,
      HP: 4
    },
    targets: 'STR-',
    value: 1,
    skills: {}
  },
  ghoulTroll: {
    name: 'Ghoul Troll',
    traits: { undead: true },
    stats: { ATK: 6, ARM: 0, HP: 10 },
    targets: 'CON+',
    value: 2,
    skills: { drain: true, fear: true }
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
    value: 1,
    skills: {}
  },
  ratThing: {
    name: 'Rat Thing',
    traits: {filth: true, vermin: true, weird: true},
    stats: {
      ATK: 4,
      ARM: 0,
      HP: 3
    },
    value: 1,
    targets: 'AGI-',
    skills: { thief: true}
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
    value: 1,
    skills: {}
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
    value: 3,
    skills: {}
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
    value: 2,
    skills: {}
  }
}
