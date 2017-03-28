import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState, LogMessagePart } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('apply damage to hero', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{HP: 7})
    },
    monsters: {
      monster: makeMonster('slitherFish')
    },
    log: [
      ['foo'],
      ['bar']
    ]
  };
  const blow = { heroId: 'hero', monsterId: 'monster', heroDMG: {value: 4, history: []} }
  const failedBlow = { heroId: 'hero', monsterId: 'monster', heroDMG: {value: 0, history: []} }

  t.plan(6);

  let result = apply_damage_to_hero(battle, failedBlow);
  t.equal(result.heroes.hero.vars.HP, 7, 'failed blow deals no damage to hero HP');
  t.ok(lastLogHasStr(result, 'but'), 'got fail msg');

  result = apply_damage_to_hero(battle, blow);
  t.equal(result.heroes.hero.vars.HP, 3, 'dmg was deducted from HP');
  t.ok(lastLogHasStr(result, 'dealt'), 'we now have correct new log message with "dealt" part');

  result = apply_damage_to_hero(result, blow);
  t.equal(result.heroes.hero.vars.HP, 0, 'HP was floored at 0');
  t.ok(lastLogHasStr(result, 'knocked'), 'msg acknowledges that hero was knocked out');
});

