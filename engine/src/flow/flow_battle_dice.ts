import { BattleState, MonsterId, FlowInstruction, FlowTarget, DiceSpec, LogMessageLine } from '../interfaces';
import { find_monsters } from '../find/find_monsters';

export interface BattleDiceSpec {
  heroId
}

export function flow_battle_dice(battle: BattleState, {heroId}:BattleDiceSpec): FlowInstruction {
  let need:DiceSpec = {}
  let chargingMonsters = find_monsters(battle,{targetting: heroId});
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
    let msg;
    if (need.defence && need.attack){
      msg = 'will attack and be attacked';
    } else if (!need.attack) {
      msg = 'will be attacked';
    } else {
      msg = 'will attack'
    }
    return ['flow','all',[
      <FlowInstruction>['flow','diceRoll',{heroId,diceTypes:need,line:[{heroRef:heroId},msg+' so must roll battle dice!']}],
      <FlowInstruction>['apply','defenceOutcome',{heroId}]
    ]];
  }
  return undefined;
}
