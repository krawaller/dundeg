/*
Initiates a regular monster attack. Hero might need option to use POW dice for defence.
*/

import { BattleState, MonsterId, FlowInstruction, EvilAttack, FlowWoundMonster, ApplyQuestion } from '../interfaces';

export interface InitiateMonsterAttackSpec {
  monsterId: MonsterId,
  attack?: EvilAttack
}

export function flow_initiate_monster_attack(battle: BattleState, {monsterId, attack}:InitiateMonsterAttackSpec): FlowInstruction {
  let monster = battle.monsters[monsterId];
  let heroId = monster.vars.target;
  let hero = battle.heroes[heroId];
  if (hero.vars.powerDie && hero.vars.failedDefence && !hero.vars.hasUsedPowForDefence){
    return <ApplyQuestion>['apply','question',{
      line: ['Will',{heroRef:heroId},'use POW to defend (can do once per round when fail defence)?'],
      options: {
        yes: ['flow','all',[
          <FlowInstruction>['apply','oneTimePowDefence',{heroId, when: 'before'}],
          ['flow','performMonsterAttack',{monsterId, attack}],
          <FlowInstruction>['apply','oneTimePowDefence',{heroId, when: 'after'}]
        ]],
        no: ['flow','performMonsterAttack',{monsterId, attack}]
      }
    }];
  }
  return ['flow','performMonsterAttack',{monsterId, attack}];
}
