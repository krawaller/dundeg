import { BattleState } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export function find_hero_actions (battle: BattleState, {heroId}: InstrJustHeroId): any {
  let ret = <any>{};
  let hero = battle.heroes[heroId];
  if (hero.vars.stance === 'assault' && hero.skills.bloodCurse){
    ret.bloodCurse = true; // TODO - sth
  }
  if (hero.vars.stance === 'defence' && hero.skills.findWeakness){
    ret.findWeakness = true; // TODO - sth
  }
  if (hero.items.daemonsBlood){
    ret.daemonsBlood = ['pickTargetAnd',{},['apply','daemonsBlood',{heroId: heroId}]]; // TODO - sth
  }
  if (hero.items.shrapnelBomb){
    ret.shrapnelBomb = ['all',[
      []
    ]];
  }
  return ret;
}
