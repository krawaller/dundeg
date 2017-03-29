import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState, LogMessagePart } from '../../src/interfaces';
import { apply_damage_to_monster } from '../../src/apply/apply_damage_to_monster';

test('apply damage to monster', t => {
  let battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler')
    },
    monsters: {
      monster: makeMonster('slitherFish',{HP: 7})
    },
    log: []
  };
  const blow = { heroId: 'hero', monsterId: 'monster', monsterDMG: {value: 4, history: []} }
  const failedBlow = { heroId: 'hero', monsterId: 'monster', monsterDMG: {value: 0, history: []} }

  battle = apply_damage_to_monster(battle, failedBlow);
  t.equal(battle.monsters.monster.vars.HP, 7, 'failed blow deals no damage to hero HP');
  t.ok(lastLogHasStr(battle, 'but'), 'got fail msg');

  battle = apply_damage_to_monster(battle, blow);
  t.equal(battle.monsters.monster.vars.HP, 3, 'dmg was deducted from HP');
  t.ok(lastLogHasStr(battle, 'dealt'), 'we now have correct new log message with "dealt" part');

  battle = apply_damage_to_monster(battle, blow);
  t.equal(battle.monsters.monster.vars.HP, 0, 'HP was floored at 0');
  t.ok(lastLogHasStr(battle, 'knocked'), 'msg acknowledges that hero was knocked out');
  t.equal(battle.monsters.monster.vars.killedBy, 'hero', 'hero got the kill correctly');

  t.end();
});

