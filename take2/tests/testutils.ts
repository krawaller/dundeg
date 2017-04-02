import {
  BattleState, MonsterBase, MonsterState, MonsterVars, MonsterStates,
  HeroBase, HeroState, HeroStates, HeroVars, HeroSkills,
  CalculationResult, ItemName
} from '../src/interfaces';

export function lastLogHasStr(battle: BattleState, str: string){
  if (!battle.log || !battle.log.length){
    throw "No messages in log when we went looking for "+str;
  }
  let lastMsg = battle.log[battle.log.length-1];
  return lastMsg.line.find( part => !!((<string>part).match && (<string>part).match(str)) );
}

export function makeMonster(monsterName: MonsterBase, vars?:MonsterVars, states?: MonsterStates): MonsterState {
  return {
    blueprint: monsterName,
    vars: vars || {},
    states: states || {},
    name: monsterName
  };
}

export function makeHero(heroName: HeroBase, vars?:HeroVars, states?: HeroStates, skills?: HeroSkills, items?: ItemName[]): HeroState {
  return {
    blueprint: heroName,
    vars: vars || {},
    states: states || {},
    skills: skills || {},
    items: (items||[]).reduce((mem,item)=>{
      mem[item] = 1;
      return mem;
    },{})
  };
}

export function calcRes(val: any): CalculationResult {
  return {
    value: val,
    history: []
  };
}
