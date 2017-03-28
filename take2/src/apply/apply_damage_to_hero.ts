import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

import { monsters, heroes } from '../library';

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
    let dealt = Math.min(ret.heroes[instr.heroId].vars.HP, instr.heroDMG.value);
    ret.heroes[instr.heroId].vars.HP -= dealt;
    if (blueprint.skills.drain){
      ret.monsters[instr.monsterId].vars.drained = (monster.vars.drained || 0) + dealt;
    }
  }
  return ret;
}
