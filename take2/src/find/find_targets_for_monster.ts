import { BattleState, HeroId, HeroStatName } from '../interfaces';
import { monsters } from '../library';
import { find_party_stat } from './find_party_stat';

interface FindTargetsForMonsterInstr {monsterId: string}

export function find_targets_for_monster(battle: BattleState, {monsterId}: FindTargetsForMonsterInstr): HeroId[]{
  let monster = battle.monsters[monsterId];
  let blueprint = monsters[monster.blueprint];
  let stat = <HeroStatName>blueprint.targets.substr(0,3);
  let high = (blueprint.targets[3] === '+');
  let party = find_party_stat(battle, {stat, reason: 'monsterTargetAcquisition', monsterId});
  return party.ordered[( high ? 0 : party.ordered.length-1 )].heroes;
}
