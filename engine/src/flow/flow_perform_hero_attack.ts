/*
Performs a regular hero attack. At this point the dice are already rolled, but we need to decide if we succeed or fail
*/

import { BattleState, HeroId, FlowInstruction, Attack, ApplyLogMessage, FlowWoundMonster } from '../interfaces';
import { monsters } from '../library';
import { deepCopy, addLog } from '../utils/helpers';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';
import { calculate_hero_attack } from '../calculate/calculate_hero_attack';
import { calculate_wounds_vs_monster } from '../calculate/calculate_wounds_vs_monster';

export interface PerformHeroAttackSpec {
  heroId: HeroId,
  attack: Attack
}

export function flow_perform_hero_attack(battle: BattleState, {heroId, attack}:PerformHeroAttackSpec): FlowInstruction {
  let hero = battle.heroes[heroId];

  if (!hero.vars.escaped){

    let monsterId = hero.vars.target;
    let monster = battle.monsters[monsterId];
    let blueprint = monsters[monster.blueprint];
    let atkStat = calculate_hero_stat(battle, {heroId, stat: attack.stat, reason: 'landAttack'});
    let rolled = hero.vars.attackDice[0] + hero.vars.attackDice[1];
    
    if(rolled > atkStat.value){
      return <ApplyLogMessage>['apply', 'log', {
        line: [{heroRef:heroId},'attacks',{monsterRef:monsterId},'with',{itemRef:attack.using || 'unarmed strike'},'but rolled '+rolled+' against '+attack.stat,atkStat,'so missed'],
        type: 'fail'
      }];
    } else if (blueprint.skills.evade && (hero.vars.attackDice[0] === hero.vars.attackDice[1]) && attack.type === 'meelee') {
      return <ApplyLogMessage>['apply', 'log', {
        line: [{monsterRef:monsterId},'evades (rolled double) the',{itemRef:attack.using || 'unarmed strike'},'attack by',{heroRef:heroId}],
        type: 'fail'
      }];
    } else {
      let damage = calculate_hero_attack(battle, {attack, heroId}); // just attack strength
      let wounds = calculate_wounds_vs_monster(battle, {monsterId,heroId,attack,damage}); // will deduct armour
      return ['flow','all',[
        <ApplyLogMessage>['apply','log',{
          line: [{heroRef:heroId},'attacks',{monsterRef:monsterId},'with',{itemRef:attack.using || 'unarmed strike'},'and rolled '+rolled+' vs '+attack.stat,atkStat,'so hit'],
          type: 'success'
        }],
        <FlowWoundMonster>['flow','woundMonster',{heroId, monsterId, wounds, attack }]
      ]];
    }

  }
}
