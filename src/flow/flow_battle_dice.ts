import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, LogMessageLine } from '../interfaces';
import { find_monsters } from '../find/find_monsters';

export interface BattleDiceSpec {
  heroId
}

export function flow_battle_dice(battle: BattleState, {heroId}:BattleDiceSpec): FlowInstruction {
  let need:DiceSpec = {}
  let chargingMonsters = find_monsters(battle,{}).filter(monsterId => battle.monsters[monsterId].vars.target === heroId);
  let hero = battle.heroes[heroId];
  if (chargingMonsters.length){
    need.defence = true;
    need.power = true;
  }
  if (hero.vars.action && hero.vars.action[1] === 'performHeroAttack'){
    need.attack = true;
    need.power = true;
  }

  if (hero.states.stunned){
    delete need.power;
  }

  if (Object.keys(need).length){
    return <FlowInstruction>['flow','diceRoll',{heroId,diceTypes:need,line:['Roll battle dice!']}];
  }
  return undefined;
}
