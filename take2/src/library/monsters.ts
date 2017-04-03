
import { MonsterDefinition } from '../interfaces';

interface MonsterBook { [idx: string]: MonsterDefinition }

export const monsters: MonsterBook = {
  _fierceTestMonster: {
    name: 'Debug monster - fierce',
    traits: {},
    stats: { ATK: 3, ARM: 3, HP: 3 },
    targets: 'CON+',
    value: 1,
    skills: { fierce: true }
  },
  backAlleyBruiser: {
    name: 'Back Alley Bruiser',
    traits: { bandit: true },
    stats: { ATK: 4, ARM: 0, HP: 4 },
    targets: 'STR-',
    value: 1,
    skills: {}
  },
  chickenWitch: {
    name: 'Chicken Witch',
    traits: { goblin: true, witch: true },
    stats: { ATK: 4, ARM: 0, HP: 5 },
    targets: 'MAG+',
    value: 2,
    skills: { rally: true, skirmish: true, summon: 'red' }
  },
  footPad: {
    name: 'Footpad',
    traits: { bandit: true },
    stats: { ATK: 4, ARM: 0, HP: 4 },
    targets: 'MRL-',
    value: 1,
    skills: { summon: 'yellow', ambush: true }
  },
  ghoulTroll: {
    name: 'Ghoul Troll',
    traits: { undead: true },
    stats: { ATK: 6, ARM: 0, HP: 10 },
    targets: 'CON+',
    value: 2,
    skills: { drain: true, fear: true }
  },
  imperialHuntsman: {
    name: 'Imperial Huntsman',
    traits: { human: true, hunter: true, law: true },
    stats: { ATK: 4, ARM: 2, HP: 4 },
    targets: 'AGI+',
    value: 2,
    skills: { pierce: 1, pursue: true }
  },
  manAtArms: {
    name: 'Man-At-Arms',
    traits: { human: true, law: true, militant: true },
    stats: { ATK: 4, ARM: 2, HP: 4 },
    targets: 'AGI+',
    value: 1,
    skills: { horde: 'militant' }
  },
  megaRat: {
    name: 'MegaRat',
    traits: {filth: true, vermin: true},
    stats: {ATK:5, ARM:0, HP:5},
    targets: 'AGI+',
    value: 1,
    skills: { infect: true }
  },
  nachtDrekSlicer: {
    name: 'Nacht Drek Slicer',
    traits: { weird: true },
    stats: { ATK: 4, ARM: 1, HP: 4 },
    targets: 'STR+',
    value: 1,
    skills: { horde: 'weird' }
  },
  nugBear: {
    name: 'Nugbear',
    traits: { goblin: true },
    stats: { ATK: 5, ARM: 0, HP: 8 },
    targets: 'STR+',
    value: 1,
    skills: { fury: true }
  },
  ratThing: {
    name: 'Rat Thing',
    traits: { filth: true, vermin: true, weird: true },
    stats: { ATK: 4, ARM: 0, HP: 3 },
    value: 1,
    targets: 'AGI-',
    skills: { thief: true, skirmish: true }
  },
  slimeCorpse: {
    name: 'Slime Corpse',
    traits: { filth: true, ooze: true, undead: true },
    stats: { ATK: 4, ARM: 1, HP: 8 },
    targets: 'CON+',
    value: 1,
    skills: { horde: 'ooze', slime: true }
  },
  slitherFish: {
    name: 'Slither Fish',
    traits: { filth: true, fishoid: true, vermin: true },
    stats: { ATK: 3, ARM: 2, HP: 3 },
    targets: 'CON+',
    value: 1,
    skills: { pain: true }
  },
  shambler: {
    name: 'Shambler',
    traits: { filth: true },
    stats: { ATK: 6, ARM: 0, HP: 12 },
    targets: 'PER+',
    value: 3,
    skills: { slime: true, ambush: true }
  },
  swampTroll: {
    name: 'Swamp Troll',
    traits: { filth: true },
    stats: { ATK: 6, ARM: 0, HP: 12 },
    targets: 'STR+',
    value: 2,
    skills: { regenerate: true }
  }
}
