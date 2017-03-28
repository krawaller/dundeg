import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('the thief skill', t => {
  const battle: BattleState = {
    heroes: {
      hero: makeHero('bloodsportBrawler',{HP: 7, gold: 7})
    },
    monsters: {
      monster: makeMonster('ratThing') // has thief
    },
    log: []
  };
  const blow = { heroId: 'hero', monsterId: 'monster', heroDMG: {value: 4, history: []} }
  const failedBlow = { heroId: 'hero', monsterId: 'monster', heroDMG: {value: 0, history: []} }

  t.plan(8);

  let result = apply_damage_to_hero(battle, blow);
  t.equal(result.heroes.hero.vars.HP, 7, 'dmg was NOT deducted from HP');
  t.equal(result.heroes.hero.vars.gold, 3, 'dmg was deducted from gold instead');
  t.ok( lastLogHasStr(result, 'stole') );

  result = apply_damage_to_hero(result, failedBlow);
  t.ok( lastLogHasStr(result, 'but') );

  result = apply_damage_to_hero(result, blow);
  t.equal(result.heroes.hero.vars.gold, 0, 'gp dmg was floored at 0');
  t.ok( lastLogHasStr(result, 'broke') );

  result = apply_damage_to_hero(result, blow);
  t.equal(result.heroes.hero.vars.gold, 0, 'gp still 0');
  t.ok( lastLogHasStr(result, 'already broke') );
});
