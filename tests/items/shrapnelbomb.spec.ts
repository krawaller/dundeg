import * as test from "tape";
import { makeHero, makeMonster, execUntil, reply, makeRoll } from '../testutils';

import { BattleState, FlowInstruction } from '../../src/interfaces';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { monsters } from '../../src/library';

test('shrapnel bomb item', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{},{},{},['shrapnelBomb']) },
    monsters: {
      monster: makeMonster('slimeCorpse'), // armour 1, HP 8
      monster2: makeMonster('slitherFish') // armour 2, HP 3
    },
    log: [],
    seed: 'shrapnelBOOOOOM' // will roll 6 1
  };

  let action: FlowInstruction = ['flow','throwShrapnelBomb',{heroId: 'hero'}];

  t.deepEqual(
    find_hero_actions(battle,{heroId:'hero'}).shrapnelBomb,
    action
  );

  battle = execUntil(battle, action);
  battle = reply(battle, makeRoll); // roll for dmg vs first monster, will be a 6 (piercing)
  battle = reply(battle, makeRoll); // roll for dmg vs second monster, will be 1
  t.equal(
    battle.monsters.monster.vars.HP,
    monsters.slimeCorpse.stats.HP - 4,
    'Did D3+1 = 4 damage, and piercing since rolled 6 so no armour'
  );
  t.equal(
    battle.monsters.monster2.vars.HP,
    monsters.slitherFish.stats.HP,
    'Did D3+1 = 2 damage, not piercing, so no damage dealt'
  );

  t.end();
});
