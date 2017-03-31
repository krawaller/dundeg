import { BattleState, MonsterId, MonsterEntrySkills } from '../interfaces';
import { find_standing_monsters } from './find_standing_monsters';
import { monsters } from '../library';

export function find_monster_entry_skills (battle: BattleState): MonsterEntrySkills {
  let ret = <MonsterEntrySkills>{};
  find_standing_monsters(battle).forEach(monsterId => {
    let monster = battle.monsters[monsterId];
    let blueprint = monsters[monster.blueprint];
    if (blueprint.skills.ambush) {
      ret.ambush = (ret.ambush || []).concat(monsterId);
    }
  });
  return ret;
}
