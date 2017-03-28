import * as test from "tape";

import { BattleState } from '../../src/interfaces';
import { monsters } from '../../src/monsters';
import { calculate_monster_armour } from '../../src/calculate/calculate_monster_armour';
import { calculate_hero_attack_options } from '../../src/calculate/calculate_hero_attack_options';

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

  const armourForNonFilth = calculate_monster_armour(battle, {monsterId: 'nonfilth', using: 'skinningKnife'});
  t.equal(armourForNonFilth.value, monsters[battle.monsters.nonfilth.blueprint].stats.ARM, 'just normal base value');

  const armourForFilth = calculate_monster_armour(battle, {monsterId: 'filth', using: 'skinningKnife'});
  t.equal(armourForFilth.value, monsters[battle.monsters.filth.blueprint].stats.ARM - 1, 'deducts 1 ARM versus filth');

  const attacks = calculate_hero_attack_options(battle, {heroId: 'wielder'});
  t.deepEqual(attacks.skinningKnife, {
    using: 'skinningKnife',
    type: 'meelee',
    stat: 'AGI'
  }, 'skinning knife offers AGI attack');
});
