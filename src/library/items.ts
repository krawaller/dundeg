import { ItemBook } from '../interfaces/item_interfaces';

export const items:ItemBook = {
  barbedWhip: {
    name: 'Barbed Whip',
    traits: {}
  },
  bastardSword: {
    name: 'Bastad Sword',
    traits: {}
  },
  daemonsBlood: {
    name: 'Daemon\'s blood',
    traits: {},
    actions: {
      throwDaemonsBlood: 'Throw Daemon\s blood'
    }
  },
  flashBomb: {
    name: 'Flash bomb',
    traits: {},
    actions: {
      throwFlashBomb: 'Throw Flash Bomb'
    }
  },
  fortuneCards: {
    name: 'Fortune Cards',
    traits: {}
  },
  huntingBow: {
    name: 'Hunting Bow',
    traits: {}
  },
  luncheonTruncheon: {
    name: 'Luncheon Truncheon',
    traits: {},
    actions: {
      luncheonTruncheonAttack: 'Luncheon Truncheon',
      throwLuncheonTruncheon: 'Throw Luncheon Truncheon'
    }
  },
  mysteryMeat: {
    name: 'Mystery Meat',
    traits: {}
  },
  nastyCleaver: {
    name: 'Nasty Cleaver',
    traits: {},
    actions: {
      nastyCleaverAttack: 'Nasty Cleaver'
    }
  },
  nightCloak: {
    name: 'Night Cloak',
    traits: {}
  },
  shoddyShield: {
    name: 'Shoddy Shield',
    traits: {}
  },
  shrapnelBomb: {
    name: 'Shrapnel Bomb',
    traits: {},
    actions: {
      throwShrapnelBomb: 'Throw shrapnel bomb'
    }
  },
  skinningKnife: {
    name: 'Skinning Knife',
    traits: { blade: true },
    actions: {
      skinningKnifeAttack: 'Skinning Knife'
    }
  },
  spikedGauntlet: {
    name: 'Spiked Gauntlet',
    traits: {},
    actions: {
      spikedGauntletAttackAssault: 'Spiked Gauntlet [CON]',
      spikedGauntletAttackDefence: 'Spiked Gauntlet [AGI]'
    }
  },
  stilleto: {
    name: 'Stilleto',
    traits: {}
  },
  studdedLeather: {
    name: 'Studded Leather',
    traits: {}
  },
  trailRation: {
    name: 'Trail Ration',
    traits: {}
  },
  vialOfPoison: {
    name: 'Vial of Poison',
    traits: {}
  },
  warPaint: {
    name: 'War Paint',
    traits: {}
  },
};