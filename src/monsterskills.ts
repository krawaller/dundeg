import { World } from './world'

import { Entity } from './interfaces'

import { add } from './utils';

export class Fierce implements Entity {
  name = 'fierce'
  type = 'skill'
  hooks = {
    calculate_monster_stat(e){
      if (e.stat === 'ATK' && e.monster.id === this.attachedTo && e.hero && e.hero.state.stance === 'defence'){
        return add(2, 'fierce');
      }
    }
  }
}

export class Horde implements Entity {
  name = 'horde'
  type = 'skill'
  props:any = {}
  constructor(trait){
    this.props.trait = trait;
  }
  hooks = {
    calculate_monster_stat(e, world: World){
      if (e.stat === 'ATK' && e.monster.id === this.attachedTo){
        let traiters = world.getAllEntities().filter(entity => {
          return entity.type === 'monster' && entity.props[this.props.trait] && entity.state.battleId === e.monster.state.battleId;
        });
        if (traiters.length){
          return add(1, 'Horde('+this.props.trait+')');
        }
      }
    }
  }
}
