import * as test from "tape";
import { makeMonster, makeHero } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/library';
import { calculate_monster_attack } from '../../src/calculate/calculate_monster_attack';

test('monster fierce state', t => {
  const battle: BattleState = {
    heroes: {
      assaulter: makeHero('bloodsportBrawler',{stance:'assault'}),
      defender: makeHero('bloodsportBrawler',{stance:'defence'})
    },
    monsters: {
      fierce: makeMonster('_fierceTestMonster')
    }
  };

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'fierce', heroId: 'assaulter'}).value,
    monsters[battle.monsters.fierce.blueprint].stats.ATK,
    'Fierce makes no difference versus assaulting hero'
  );

  t.equal(
    calculate_monster_attack(battle, {monsterId: 'fierce', heroId: 'defender'}).value,
    monsters[battle.monsters.fierce.blueprint].stats.ATK + 2,
    'Fierce gives 2 extra atk versus defending hero'
  );

  t.end();

});
