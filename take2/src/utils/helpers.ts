
import {MonsterState, MonsterTraitName, BattleState, HeroState, ItemName, LogMessageLine, LogMessageType} from '../interfaces';

import {monsters} from '../library';

export const isMonsterAlive = (monster: MonsterState) => !monster.vars.killedBy && !monster.vars.escaped;

export const monsterHasTrait = (monster: MonsterState, trait: MonsterTraitName) => monsters[monster.blueprint].traits[trait];

export const deepCopy = (obj: BattleState): BattleState => JSON.parse(JSON.stringify(obj));

export const isHeroAlive = (hero: HeroState) => !hero.vars.escaped && !hero.vars.knockedOutBy;

export function removeAnItem(hero: HeroState, item: ItemName){
  hero.items[item]--;
  if (!hero.items[item]){
    delete hero.items[item];
  }
}

export function addLog(battle: BattleState, line: LogMessageLine, type: LogMessageType = 'info'): BattleState {
  battle.log.push({
    type: type,
    line: line
  });
  return battle;
}
