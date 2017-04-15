
export type ItemName = keyof Inventory;

export interface Inventory {
  barbedWhip?: number
  bastardSword?: number
  daemonsBlood?: number
  fortuneCards?: number
  huntingBow?: number
  luncheonTruncheon?: number
  mysteryMeat?: number
  nastyCleaver?: number
  nightCloak?: number
  shoddyShield?: number
  shrapnelBomb?: number
  skinningKnife?: number
  spikedGauntlet?: number
  stilleto?: number
  studdedLeather?: number
  trailRation?: number
  vialOfPoison?: number
  warPaint?: number
}

export interface ItemDef {
  name: string
  traits: ItemTraits
}

export interface ItemBook {
  barbedWhip?: ItemDef
  bastardSword?: ItemDef
  daemonsBlood?: ItemDef
  fortuneCards?: ItemDef
  huntingBow?: ItemDef
  luncheonTruncheon?: ItemDef
  mysteryMeat?: ItemDef
  nastyCleaver?: ItemDef
  nightCloak?: ItemDef
  shoddyShield?: ItemDef
  shrapnelBomb?: ItemDef
  skinningKnife?: ItemDef
  spikedGauntlet?: ItemDef
  stilleto?: ItemDef
  studdedLeather?: ItemDef
  trailRation?: ItemDef
  vialOfPoison?: ItemDef
  warPaint?: ItemDef
}

export type ItemTraitName = keyof ItemTraits;

export interface ItemTraits {
  blade?: true
}
