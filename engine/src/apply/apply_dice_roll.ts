import { BattleState, HeroId, DiceSpec } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { die } from '../utils/rand';
import { apply_log } from './apply_log';


export interface DiceRollSpec {
  heroId: HeroId
  diceTypes: DiceSpec
}



export function apply_dice_roll (battle:BattleState, {heroId,diceTypes}: DiceRollSpec): BattleState {
  let ret:BattleState = deepCopy(battle);
  let hero = ret.heroes[heroId];
  let msg = [];
  let temp;
  if ((temp=diceTypes['attack'])){
    hero.vars.attackDice = [];
    while (temp){
      hero.vars.attackDice.push(die(battle.seed));
      msg.push('ATK{' + hero.vars.attackDice[hero.vars.attackDice.length-1] + '}');
      temp--;
    }
  }
  if ((temp=diceTypes['defence'])){
    hero.vars.defenceDice = [];
    while (temp){
      hero.vars.defenceDice.push(die(battle.seed));
      msg.push('DEF{' + hero.vars.defenceDice[hero.vars.defenceDice.length-1] + '}');
      temp--;
    }
  }
  if ((temp=diceTypes['power'])){
    hero.vars.powerDice = [];
    while (temp){
      hero.vars.powerDice.push(die(battle.seed));
      msg.push('POW{' + hero.vars.powerDice[hero.vars.powerDice.length-1] + '}');
      temp--;
    }
  }
  ret = apply_log(ret, {line: [{heroRef:heroId},'rolled'].concat(msg), type: 'action' });
  return ret;
}
