import * as React from 'react'
import { withBattle } from '../connector'

import { BattleState, HeroId } from '../../engine/src/interfaces'

import { heroes } from '../../engine/src/library/heroes'

export interface GivenProps {
  heroId: HeroId
  highlight: boolean
}

export const Hero = withBattle<GivenProps>((props) => {
  const hero = props.battle.heroes[props.heroId]
  const blueprint = heroes[hero.blueprint]
  const status = hero.vars.escaped
    ? 'escaped'
    : hero.vars.knockedOutBy
    ? 'knocked out'
    : hero.vars.stance
    ? hero.vars.stance
    : 'idle'
  return (
    <div className={'hero' + (props.highlight ? ' highlight' : '')}>
      <strong>Hero: {blueprint.name}</strong>
      <div>
        HP: {hero.vars.HP}/{blueprint.stats.CON * 2}, luck: {hero.vars.luck},
        gold: {hero.vars.gold}, status: {status}
      </div>
      <div>skills: {Object.keys(hero.skills).join(',')}</div>
      <div>items: {Object.keys(hero.items).join(',')}</div>
      {Object.keys(hero.states).length > 0 && (
        <div>states: {Object.keys(hero.states).join(',')}</div>
      )}
    </div>
  )
})
