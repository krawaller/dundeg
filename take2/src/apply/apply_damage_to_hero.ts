import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

import { monsters } from '../monsters';
import { heroes } from '../heroes';

interface ApplyDamageToHeroInstr {
  heroId: string,
  monsterId: string,
  heroDMG: CalculationResult
}

export const apply_damage_to_hero = (battle: BattleState, instr: ApplyDamageToHeroInstr): BattleState => {
  let ret = battle; // TODO - copy;
  let monster = battle.monsters[instr.monsterId]
  let blueprint = monsters[monster.blueprint];
  if (blueprint.skills.thief){
    ret.heroes[instr.heroId].vars.gold = Math.max(ret.heroes[instr.heroId].vars.gold - instr.heroDMG.value, 0);
  } else {
    ret.heroes[instr.heroId].vars.HP = Math.max(ret.heroes[instr.heroId].vars.HP - instr.heroDMG.value, 0);
  }
  return ret;
}