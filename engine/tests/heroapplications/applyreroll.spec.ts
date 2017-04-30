import * as test from "tape";
import { makeHero } from '../testutils';

import { BattleState } from '../../src/interfaces';
import { apply_reroll } from '../../src/apply/apply_reroll';

test('apply reroll', t => {
  let battle: BattleState = {
    heroes: { hero: makeHero('bloodsportBrawler',{luck: 777}) },
    monsters: {},
    log: []
  };

  battle.heroes.hero.vars.attackDice = [666,666];
  battle = apply_reroll(battle, {heroId: 'hero', diceType: 'attack', index: 0});
  t.equal(battle.heroes.hero.vars.luck, 776, 'hero paid a luck for reroll');
  t.ok(battle.heroes.hero.vars.attackDice[0] !== 666, 'first attack die was rerolled');

  battle.heroes.hero.vars.defenceDice = [666,666];
  battle = apply_reroll(battle, {heroId: 'hero', diceType: 'defence', index:1});
  t.ok(battle.heroes.hero.vars.defenceDice[1] !== 666, 'second defence die was rerolled');

  battle.heroes.hero.vars.powerDice = [666];
  battle = apply_reroll(battle, {heroId: 'hero', diceType: 'power', index: 0});
  t.ok(battle.heroes.hero.vars.powerDice[0] !== 666, 'power die was rerolled');

  t.end();
});
