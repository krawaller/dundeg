import { BattleState, Attack, CalculationResult, AttackType } from '../interfaces';

import { monsters } from '../library';

interface CalculateMonsterDamageInstr {
  monsterId: string,
  heroId?: string,
  attack?: Attack,
  heroATK: CalculationResult,
  monsterARM: CalculationResult,
  powerDie?: number
}

export function calculate_damage_vs_monster (battle: BattleState, instr: CalculateMonsterDamageInstr): CalculationResult {
  let monster = battle.monsters[instr.monsterId];
  let monsterBlueprint = monsters[monster.blueprint];
  let hero = battle.heroes[instr.heroId];
  let val = {
    history: [
      ['Hero ATK value', instr.heroATK.value, instr.heroATK.history],
      ['Reduced by monster ARM', '-'+instr.monsterARM.value, instr.monsterARM.history]
    ],
    value: instr.heroATK.value - instr.monsterARM.value
  }
  if (hero.vars.powerDie === 6 && instr.attack && instr.attack.using === 'nastyCleaver' && hero.vars.stance === 'assault'){
    val.history.push(['Nasty Cleaver deals 1 extra damage when assaulting', '+1']);
    val.value++;
  }
  if (hero.skills.backStab && monster.vars.target !== instr.heroId && hero.vars.stance === 'assault' && instr.attack.type === 'meelee'){
    val.history.push(['Backstab deals 1 extra DMG for meelee attacks in assault stance vs monsters targetting someone else', '+1']);
    val.value++;
  }
  if (val.value>0){
    if (monster.states.weakness){
      val.history.push(['Found Weakness means 1 followup damage', '+1']);
      val.value++;
    }
    if (hero.skills.exterminator && hero.vars.stance === 'assault' && monsterBlueprint.traits.vermin){
      val.history.push(['Exterminator deals 1 followup damage vs Vermin when assaulting', '+1']);
      val.value++;
    }
    if (hero.skills.rage && hero.vars.stance === 'assault' && instr.attack.stat === 'STR' && monster.vars.target === instr.heroId){
      val.history.push(['Rage deals 1 followup damage when assaulting monster targetting you', '+1']);
      val.value++;
    }
    if (hero.skills.foeKiller && hero.vars.stance === 'assault' && monsterBlueprint.value >= 3){
      val.history.push(['Foekiller deals 1 followup damage when assaulting value 3+ enemies', '+1']);
      val.value++;
    }
  }
  return val;
}
