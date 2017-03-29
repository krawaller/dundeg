import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_damage_to_hero } from '../../src/apply/apply_damage_to_hero';

test('the monster thief skill', t => {
  let battle: BattleState = {
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

  battle = apply_damage_to_hero(battle, blow);
  t.equal(battle.heroes.hero.vars.HP, 7, 'dmg was NOT deducted from HP');
  t.equal(battle.heroes.hero.vars.gold, 3, 'dmg was deducted from gold instead');
  t.ok( lastLogHasStr(battle, 'stole') );

  battle = apply_damage_to_hero(battle, failedBlow);
  t.ok( lastLogHasStr(battle, 'but') );

  battle = apply_damage_to_hero(battle, blow);
  t.equal(battle.heroes.hero.vars.gold, 0, 'gp dmg was floored at 0');
  t.ok( lastLogHasStr(battle, 'broke') );

  battle = apply_damage_to_hero(battle, blow);
  t.equal(battle.heroes.hero.vars.gold, 0, 'gp still 0');
  t.ok( lastLogHasStr(battle, 'already broke') );

  t.end();
});
