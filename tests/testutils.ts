import {
  BattleState, MonsterBase, MonsterState, MonsterVars, MonsterStates,
  HeroBase, HeroState, HeroStates, HeroVars, HeroSkills,
  CalculationResult, ItemName, LogMessageLine, FlowInstruction
} from '../src/interfaces';

import { monsters } from '../src/library/monsters';

export function logHasStr(battle: BattleState, str: string){
  if (!battle.log || !battle.log.length){
    throw "No messages in log when we went looking for "+str;
  }
  return battle.log.find( entry=> !!logMessageContains(entry.line, str) );
}

export function logMessageContains(msg: LogMessageLine, str: string){
  return msg.find( part => !!((<string>part).match && (<string>part).match(str)) );
}

export function lastLogHasStr(battle: BattleState, str: string){
  if (!battle.log || !battle.log.length){
    throw "No messages in log when we went looking for "+str;
  }
  let lastMsg = battle.log[battle.log.length-1];
  return lastMsg.line.find( part => !!((<string>part).match && (<string>part).match(str)) );
}

export function makeMonster(monsterName: MonsterBase, vars?:MonsterVars, states?: MonsterStates): MonsterState {
  let v = vars || {};
  v.HP = v.HP || monsters[monsterName].stats.HP;
  return {
    blueprint: monsterName,
    vars: v,
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

import { exec_step } from '../src/exec/exec_step';
import { exec_until } from '../src/exec/exec_until';
import { exec_reply } from '../src/exec/exec_reply';

export function execUntil(battle:BattleState,instr:FlowInstruction): BattleState{
  return exec_until({
    ...battle,
    stack: [instr].concat(battle.stack || [])
  });
}

export function execTo(battle, instr: FlowInstruction, targets: string[]){
  battle.stack = [instr].concat(battle.stack || []);
  while(battle.stack.length && targets.indexOf(battle.stack[0][1]) === -1){
    battle = exec_step(battle);
  }
  return battle;
}

export function reply(battle,opt:string): BattleState{
  return exec_until( exec_reply(battle, {option:opt}) );
}

export function justReply(battle,opt:string): BattleState{
  return exec_reply(battle, {option:opt});
}

export function step(battle,instr:FlowInstruction): BattleState{
  return exec_step({
    ...battle,
    stack: [instr].concat(battle.stack || [])
  });
}

export function next(battle): BattleState{
  return exec_step(battle);
}

export const acceptRoll = 'accept';
export const makeRoll = 'roll';