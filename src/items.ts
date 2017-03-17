import { Entity } from './interfaces';
import { subtract } from './utils';

export class SkinningKnife implements Entity {
  props:any = {}
  type = 'item'
  name = 'Skinning Knife'
  hooks = {
    gather_attack_options(e) {
      if (e.hero.id === this.attachedTo){
        return {stat: 'AGI', type: 'meelee', name: this.name};
      }
    },
    calculate_monster_stat(e){
      if (e.stat === 'ARM' && e.using === this && e.monster.props.filth){
        return subtract(1, 'Skinning Knife');
      }
    }
  }
}

export class SpikedGauntlet implements Entity {
  props:any = {}
  type = 'item'
  name = 'Spiked Gauntlet'
  hooks = {
    gather_attack_options(e) {
      if (e.hero.id === this.attachedTo){
        return {stat: e.hero.state.stance === 'defence' ? 'AGI' : 'STR', type: 'meelee', name: this.name};
      }
    }
  }
}
