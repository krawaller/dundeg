import { World } from './world'

import { Entity } from './interfaces'

import { add, force } from './utils';

export class SixthSense implements Entity {
  type = 'skill'
  name = 'Sixth Sense'
  hooks = {
    calculate_hero_stat(e,world){
      if (e.testAgainst === 'ambush'){
        if (e.hero.id === this.attachedTo){
          return force(666, this.name);
        } else if (world.getEntity(this.attachedTo).state.battleId === e.hero.state.battleId){
          return add(1, this.name)
        }
      }
    }
  }
}