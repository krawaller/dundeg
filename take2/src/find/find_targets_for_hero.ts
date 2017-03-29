import { BattleState, MonsterId } from '../interfaces';
import { find_standing_monsters } from './find_standing_monsters';

interface FindTargetsForHeroInstr {heroId: string}

export function find_targets_for_hero(battle: BattleState, {heroId}: FindTargetsForHeroInstr): MonsterId[]{
  let {targettingMe, targettingOthers} = find_standing_monsters(battle).reduce((mem,monsterId)=>{
    mem[battle.monsters[monsterId].vars.target === heroId ? 'targettingMe' : 'targettingOthers'].push(monsterId);
    return mem;
  },{targettingMe:[], targettingOthers: []});
  return targettingMe.length ? targettingMe : targettingOthers;
}
