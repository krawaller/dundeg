import { Entity } from './interfaces'
import { add, force, divide } from './utils';

export class Dazed implements Entity {
  type = 'state'
  name = 'dazed'
  hooks = {
    calculate_monster_stat(e){
      if (e.monster.id === this.attachedTo){
        return divide(2, 'dazed', true);
      }
    },
    battle_round_end(e, world){
      if (e.battleId === world.getParent(this).state.battleId){
        world.removeEntity(this);
      }
    }
  }
}

export class Exalted implements Entity {
  type = 'state'
  name = 'exalted'
  hooks = {
    calculate_hero_stat(e) {
      if (e.hero.id === this.attachedTo && e.stat === 'MAG'){
        return add(1, 'exalted');
      }
    }
  }
};

export class Corroded implements Entity {
  type = 'state'
  name = 'corroded'
  hooks = {
    calculate_monster_stat(e){
      if (e.monster.id === this.attachedTo){
        return force(0, 'corroded');
      }
    }
  }
}
