/*
Initiates a regular monster attack. Hero might need option to use POW dice for defence.
*/

import { BattleState, MonsterId, FlowInstruction, EvilAttack, FlowWoundMonster, ApplyQuestion } from '../interfaces';

import { calculate_monster_attack } from '../calculate/calculate_monster_attack';

export interface InitiateMonsterAttackSpec {
  monsterId: MonsterId,
  attack?: EvilAttack
}

export function flow_initiate_monster_attack(battle: BattleState, {monsterId, attack}:InitiateMonsterAttackSpec): FlowInstruction {
  let monster = battle.monsters[monsterId];
  let heroId = monster.vars.target;
  let hero = battle.heroes[heroId];
  if (hero.vars.powerDice && hero.vars.powerDice.length && hero.vars.stance === 'guard' && hero.vars.failedDefence){
    if (!hero.vars.usedPowerDice){ hero.vars.usedPowerDice = hero.vars.powerDice.map(d=>false); } // TODO - elsewhere
    let availableDiceIndexes = hero.vars.usedPowerDice.reduce(
      (mem,bool,n)=> {
        if (!bool){
          mem.push(n);
        }
        return mem;
      },
      []
    );
    if (availableDiceIndexes.length){
      let opts = availableDiceIndexes.reduce((mem,idx)=>{
        mem['POW die '+hero.vars.powerDice[idx]] = ['flow','all',[
          <FlowInstruction>['apply','oneTimePowDefence',{heroId, when: 'before', index: idx}],
          ['flow','performMonsterAttack',{monsterId, attack}],
          <FlowInstruction>['apply','oneTimePowDefence',{heroId, when: 'after'}]
        ]];
        return mem;
      },{no: ['flow','performMonsterAttack',{monsterId, attack}]});
      let atk = calculate_monster_attack(battle,{monsterId});
      return <ApplyQuestion>['apply','question',{
        line: ['Will',{heroRef:heroId},'use a POW to defend (can do once per dice per round in guard stance when fail defence) against',{monsterRef:monsterId},'with ATK',atk,'?'],
        options: opts
      }];
    }
  }
  return ['flow','performMonsterAttack',{monsterId, attack}];
}
