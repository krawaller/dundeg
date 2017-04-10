import { BattleState, HeroId } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { die } from '../utils/rand';

export interface DiceRollSpec {
  heroId: HeroId
  diceType: DiceSpec
}

export interface DiceSpec {
  attack?: true
  defence?: true
  power?: true
  singleAttack?: true
}

export function apply_dice_roll (battle:BattleState, {heroId,diceType}: DiceRollSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  if (diceType['attack']){
    hero.vars.attackDice = [
      die(battle.seed),
      die(battle.seed)
    ];
  } else if (diceType['singleAttack']){
    hero.vars.attackDice = [die(battle.seed)];
  }
  if (diceType['defence']){
    hero.vars.defenceDice = [
      die(battle.seed),
      die(battle.seed)
    ];
  }
  if (diceType['power']){
    hero.vars.powerDie = die(battle.seed);
  }
  return ret;
}
