import * as test from "tape";

import { BattleState } from '../../src/interfaces';

import { monsters } from '../../src/monsters';

import { calc } from '../../src/modes';

test('monster fierce state', t => {
  const battle: BattleState = {
    heroes: {
      assaulter: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'assault'},
        states: {},
        items: {}
      },
      defender: {
        blueprint: 'bloodsportBrawler',
        vars: { stance: 'defence' },
        states: {},
        items: {}
      }
    },
    monsters: {
      fierce: {
        blueprint: 'slitherFish',
        vars: {},
        states: {fierce: true}
      }
    }
  };

  t.plan(2);

  const vsAssaulter = calc.calc_monster_attack(battle, {id: 'fierce', heroId: 'assaulter'});
  t.equal(vsAssaulter.value, monsters[battle.monsters.fierce.blueprint].stats.ATK, 'Fierce makes no difference versus assaulting hero');

  const vsDefender = calc.calc_monster_attack(battle, {id: 'fierce', heroId: 'defender'});
  t.equal(vsDefender.value, monsters[battle.monsters.fierce.blueprint].stats.ATK + 2, 'Fierce gives 2 extra atk versus defending hero');

});
