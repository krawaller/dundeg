import { BattleState, HeroStatName, Attack, AttackOptions, ItemName, CalculationResult } from '../interfaces';

import { monsters, heroes } from '../library';

interface ApplyDamageToHeroInstr {
  heroId: string,
  monsterId: string,
  heroDMG: CalculationResult
}

// TODO - log messages!

export const apply_damage_to_hero = (battle: BattleState, {heroId,monsterId,heroDMG}: ApplyDamageToHeroInstr): BattleState => {
  let ret = battle; // TODO - copy;
  let monster = ret.monsters[monsterId];
  let target = ret.heroes[heroId];
  let blueprint = monsters[monster.blueprint];
  let monRef = {monsterRef: monsterId};
  let heroRef = {heroRef: heroId};
  if (blueprint.skills.thief){
    if (!heroDMG.value){
      ret.log.push( [monRef, 'attacked', heroRef, 'but damage was', heroDMG] ); // 0 damage, stil lwant to expose calculation
    } else if (!target.vars.gold){
      ret.log.push( [monRef, 'tried to steal', heroDMG, 'gold but', heroRef, 'was already broke'] );
    } else {
      let dealt = Math.min(target.vars.gold, heroDMG.value);
      target.vars.gold -= dealt;
      if (target.vars.gold){
        ret.log.push( [monRef, 'stole', heroDMG, 'gold from', heroRef] );
      } else {
        ret.log.push( [monRef, 'stole', heroDMG, 'gold, leaving', heroRef, ' completely broke!'] );
      }
    }
  } else {
    let dealt = Math.min(target.vars.HP, heroDMG.value);
    if (dealt){
      target.vars.HP -= dealt;
      if (target.vars.HP){
        ret.log.push( [monRef, 'dealt', heroDMG, 'damage to', heroRef] );
      } else {
        ret.log.push( [monRef, 'knocked', heroRef, 'out with', heroDMG, 'damage' ] );
      }
      if (blueprint.skills.drain){
        ret.monsters[monsterId].vars.drained = (monster.vars.drained || 0) + dealt;
        ret.log.push( [monRef, 'has drain and will recover as many wounds at the end of round'] );
      }
      if (blueprint.skills.infect && !target.states.infected){
        target.states.infected = true;
        ret.log.push( [monRef, 'infected', heroRef, 'preventing HP recovery during next rest'] );
      }
    } else {
      ret.log.push( [monRef, 'attacked', heroRef, 'but damage was', heroDMG] ); // 0 damage, stil lwant to expose calculation
    }
  }
  return ret;
}
