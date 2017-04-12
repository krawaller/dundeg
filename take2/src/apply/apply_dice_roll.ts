import { BattleState, HeroId, DiceSpec } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { die } from '../utils/rand';

export interface DiceRollSpec {
  heroId: HeroId
  diceTypes: DiceSpec
}

export function apply_dice_roll (battle:BattleState, {heroId,diceTypes}: DiceRollSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  if (diceTypes['attack']){
    hero.vars.attackDice = [
      die(battle.seed),
      die(battle.seed)
    ];
  } else if (diceTypes['singleAttack']){
    hero.vars.attackDice = [die(battle.seed)];
  }
  if (diceTypes['defence']){
    hero.vars.defenceDice = [
      die(battle.seed),
      die(battle.seed)
    ];
  }
  if (diceTypes['power']){
    hero.vars.powerDie = die(battle.seed);
  }
  return ret;
}
