import { BattleState, HeroId, DiceSpec } from '../interfaces';
import { deepCopy } from '../utils/helpers';
import { die } from '../utils/rand';
import { apply_log } from './apply_log';


export interface DiceRollSpec {
  heroId: HeroId
  diceTypes: DiceSpec
}



export function apply_dice_roll (battle:BattleState, {heroId,diceTypes}: DiceRollSpec): BattleState {
  let ret = deepCopy(battle);
  let hero = ret.heroes[heroId];
  let msg = [];
  if (diceTypes['attack']){
    hero.vars.attackDice = [
      die(battle.seed),
      die(battle.seed)
    ];
    msg.push('ATK{' + hero.vars.attackDice[0] + '}');
    msg.push('ATK{' + hero.vars.attackDice[1] + '}');
  } else if (diceTypes['singleAttack']){
    hero.vars.attackDice = [die(battle.seed)];
    msg.push('ATK{' + hero.vars.attackDice[0] + '}');
  }
  if (diceTypes['defence']){
    hero.vars.defenceDice = [
      die(battle.seed),
      die(battle.seed)
    ];
    msg.push('DEF{' + hero.vars.defenceDice[0] + '}');
    msg.push('DEF{' + hero.vars.defenceDice[1] + '}');
  }
  if (diceTypes['power']){
    hero.vars.powerDie = die(battle.seed);
    msg.push('POW{' + hero.vars.powerDie + '}');
  }
  ret = apply_log(ret, {line: [{heroRef:heroId},'rolled'].concat(msg), type: 'action' });
  return ret;
}
