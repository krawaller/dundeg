import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState, LogMessagePart } from '../../src/interfaces';
import { apply_damage_to_monster } from '../../src/apply/apply_damage_to_monster';

test('apply damage to monster', t => {
  const battle: BattleState = {
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

  t.plan(7);

  let result = apply_damage_to_monster(battle, failedBlow);
  t.equal(result.monsters.monster.vars.HP, 7, 'failed blow deals no damage to hero HP');
  t.ok(lastLogHasStr(result, 'but'), 'got fail msg');

  result = apply_damage_to_monster(battle, blow);
  t.equal(result.monsters.monster.vars.HP, 3, 'dmg was deducted from HP');
  t.ok(lastLogHasStr(result, 'dealt'), 'we now have correct new log message with "dealt" part');

  result = apply_damage_to_monster(result, blow);
  t.equal(result.monsters.monster.vars.HP, 0, 'HP was floored at 0');
  t.ok(lastLogHasStr(result, 'knocked'), 'msg acknowledges that hero was knocked out');
  t.equal(result.monsters.monster.vars.killedBy, 'hero', 'hero got the kill correctly');
});

