import { BattleState, FlowEscape } from '../interfaces'
import { items, heroSkills, misc } from '../library'
import { registerAndTarget } from '../utils/helpers'
import { find_monsters } from './find_monsters'
interface InstrJustHeroId {
  heroId: string
}

export function find_hero_actions(
  battle: BattleState,
  { heroId }: InstrJustHeroId
): any {
  const ret = <any>{}

  const hero = battle.heroes[heroId]
  if (
    hero.vars.stance === 'guard' &&
    !hero.items.nightCloak &&
    !find_monsters(battle, { targetting: heroId, pursuer: true }).length
  ) {
    ret[misc.basicActions.escape] = [
      'apply',
      'registerActionSelection',
      { heroId, action: ['flow', 'escape', { heroId }] },
    ]
  }
  if (hero.vars.stance === 'guard' && hero.items.nightCloak) {
    ret[items.nightCloak.actions.nightCloakEscapeAGI] = [
      'apply',
      'registerActionSelection',
      { heroId, action: ['flow', 'escape', { heroId, how: 'cloakAGI' }] },
    ]
    ret[items.nightCloak.actions.nightCloakEscapeMAG] = [
      'apply',
      'registerActionSelection',
      { heroId, action: ['flow', 'escape', { heroId, how: 'cloakMAG' }] },
    ]
  }
  if (hero.vars.stance === 'assault' && hero.skills.bloodCurse) {
    ret[heroSkills.bloodCurse.actions.castBloodCurse] = registerAndTarget(
      heroId,
      ['flow', 'bloodCurse', { heroId }],
      ['Who should', { heroRef: heroId }, 'cast a Blood Curse at?']
    )
  }
  if (
    hero.vars.stance === 'guard' &&
    hero.skills.findWeakness &&
    !find_monsters(battle, { weakenedBy: heroId }).length
  ) {
    ret[heroSkills.findWeakness.actions.findWeakness] = registerAndTarget(
      heroId,
      ['flow', 'weakness', { heroId }],
      ['Who should', { heroRef: heroId }, 'look for a weakness in?']
    )
  }
  if (hero.items.daemonsBlood) {
    ret[items.daemonsBlood.actions.throwDaemonsBlood] = registerAndTarget(
      heroId,
      ['flow', 'daemonsBlood', { heroId }],
      ['Who should', { heroRef: heroId }, "throw the Daemon's Blood at?"]
    )
  }
  if (hero.items.shrapnelBomb) {
    ret[items.shrapnelBomb.actions.throwShrapnelBomb] = [
      'apply',
      'registerActionSelection',
      { heroId, action: ['flow', 'throwShrapnelBomb', { heroId }] },
    ]
  }
  if (hero.items.flashBomb) {
    ret[items.flashBomb.actions.throwFlashBomb] = [
      'apply',
      'registerActionSelection',
      { heroId, action: ['flow', 'flashBomb', { heroId }] },
    ]
  }
  return ret
}
