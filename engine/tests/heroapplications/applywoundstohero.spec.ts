import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster, calcRes } from '../testutils';

import { BattleState, LogMessagePart } from '../../src/interfaces';
import { apply_wounds_to_hero } from '../../src/apply/apply_wounds_to_hero';

test('apply wounds to hero', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{HP: 7}) },
    monsters: { monster: makeMonster('slitherFish') },
    log: []
  };
  const blow = { heroId: 'hero', monsterId: 'monster', wounds: calcRes(4) }
  const failedBlow = { heroId: 'hero', monsterId: 'monster', wounds: calcRes(0) }

  battle = apply_wounds_to_hero(battle, failedBlow);
  t.equal(battle.heroes.hero.vars.HP, 7, 'failed blow deals no damage to hero HP');
  t.ok(lastLogHasStr(battle, 'took'), 'still got msg');

  battle = apply_wounds_to_hero(battle, blow);
  t.equal(battle.heroes.hero.vars.HP, 3, 'dmg was deducted from HP');
  t.ok(lastLogHasStr(battle, 'took'), 'still got msg');

  battle = apply_wounds_to_hero(battle, blow);
  t.equal(battle.heroes.hero.vars.HP, 0, 'HP was floored at 0');
  t.ok(lastLogHasStr(battle, 'knocked'), 'msg acknowledges that hero was knocked out');

  t.end();
});

