import {
  BattleState, MonsterBase, MonsterState, MonsterVars, MonsterStates,
  HeroBase, HeroState, HeroStates, HeroVars, HeroSkills
} from '../src/interfaces';

export function lastLogHasStr(battle: BattleState, str: string){
  if (!battle.log || !battle.log.length){
    throw "No messages in log when we went looking for "+str;
  }
  let lastMsg = battle.log[battle.log.length-1];
  return lastMsg.find( part => !!((<string>part).match && (<string>part).match(str)) );
}

export function makeMonster(monsterName: MonsterBase, vars?:MonsterVars, states?: MonsterStates): MonsterState {
  return {
    blueprint: monsterName,
    vars: vars || {},
    states: states || {}
  };
}

export function makeHero(heroName: HeroBase, vars?:HeroVars, states?: HeroStates, skills?: HeroSkills): HeroState {
  return {
    blueprint: heroName,
    vars: vars || {},
    states: states || {},
    skills: skills || {}
  };
}

