import { BattleState, HeroId, DiceType } from '../interfaces';
import { deepCopy } from '../utils/helpers';

export interface DiceRollSpec {
  heroId: HeroId
  diceType: {
    attack?: true
    defence?: true
    power?: true
  }
}

export function apply_dice_roll (battle:BattleState, {heroId,diceType}: DiceRollSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  if (diceType['attack']){
    hero.vars.attackDice = [
      Math.floor(Math.random()*6)+1,
      Math.floor(Math.random()*6)+1
    ];
  }
  if (diceType['defence']){
    hero.vars.defenceDice = [
      Math.floor(Math.random()*6)+1,
      Math.floor(Math.random()*6)+1
    ];
  }
  if (diceType['power']){
    hero.vars.powerDie = Math.floor(Math.random()*6)+1;
  }
  return ret;
}
