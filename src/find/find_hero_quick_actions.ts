import { BattleState } from '../interfaces';

interface InstrJustHeroId { heroId: string }

export function find_hero_quick_actions (battle: BattleState, {heroId}: InstrJustHeroId): any {
  let ret = <any>{};
  let hero = battle.heroes[heroId];
  if (hero.items.luncheonTruncheon){
    ret.luncheonTruncheon = ['apply','luncheonTruncheonThrow',{heroId:heroId}]
  }
  return ret;
}
