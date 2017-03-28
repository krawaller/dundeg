import { BattleState, Attack, CalculationResult } from '../interfaces';

import { monsters } from '../library';

interface InstrDamageVsMonster {
  monsterId: string,
  heroId?: string,
  attack?: Attack,
  using?: string,
  heroATK: CalculationResult,
  monsterARM: CalculationResult,
  powerDie?: number
}

export const calculate_damage_vs_monster = (battle: BattleState, instr: InstrDamageVsMonster): CalculationResult => {
  let monster = battle.monsters[instr.monsterId];
  let hero = battle.heroes[instr.heroId];
  let val = {
    history: [
      ['Hero ATK value', instr.heroATK.value, instr.heroATK.history],
      ['Reduced by monster ARM', '-'+instr.monsterARM.value, instr.monsterARM.history]
    ],
    value: instr.heroATK.value - instr.monsterARM.value
  }
  if (hero.vars.POW === 6 && instr.using === 'nastyCleaver' && hero.vars.stance === 'assault'){
    val.history.push(['Nasty Cleaver deals 1 followup damage when assaulting', '+1']);
    val.value++;
  }
  if (val.value>0){
    if (monster.states.weakness){
      val.history.push(['Found Weakness means 1 followup damage', '+1']);
      val.value++;
    }
    if (hero.skills.exterminator && hero.vars.stance === 'assault' && monsters[monster.blueprint].traits.vermin){
      val.history.push(['Exterminator deals 1 followup damage vs Vermin when assaulting', '+1']);
      val.value++;
    }
    if (hero.skills.rage && hero.vars.stance === 'assault' && instr.attack.stat === 'STR'){
      val.history.push(['Rage deals 1 followup damage when assaulting', '+1']);
      val.value++;
    }
  }
  return val;
};
