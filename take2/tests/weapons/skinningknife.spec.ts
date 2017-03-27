import * as test from "tape";

import { BattleState } from '../../src/interfaces';

import { monsters } from '../../src/monsters';

import { calc } from '../../src/modes';

test('skinning knife', t => {
  const battle: BattleState = {
    heroes: {
      wielder: {
        blueprint: 'bloodsportBrawler',
        vars: {},
        states: {},
        items: { skinningKnife: true }
      }
    },
    monsters: {
      nonfilth: { blueprint: 'manAtArms', states: {}, vars: {} },
      filth: { blueprint: 'slitherFish', states: {}, vars: {} }
    }
  };

  t.plan(3);

  const armourForNonFilth = calc.calc_monster_armour(battle, {id: 'nonfilth', using: 'skinningKnife'});
  t.equal(armourForNonFilth.value, monsters[battle.monsters.nonfilth.blueprint].stats.ARM, 'just normal base value');

  const armourForFilth = calc.calc_monster_armour(battle, {id: 'filth', using: 'skinningKnife'});
  t.equal(armourForFilth.value, monsters[battle.monsters.filth.blueprint].stats.ARM - 1, 'deducts 1 ARM versus filth');

  const attacks = calc.calc_hero_attack_options(battle, {id: 'wielder'});
  t.deepEqual(attacks.skinningKnife, {
    using: 'skinningKnife',
    type: 'meelee',
    stat: 'AGI'
  }, 'skinning knife offers AGI attack');
});
