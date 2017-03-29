import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { find_targets_for_hero } from '../../src/find/find_targets_for_hero';

test('find hero options', t => {
  const battle: BattleState = {
    heroes: {
      disturbed: makeHero('bloodsportBrawler'),
      undisturbed: makeHero('hinterLander')
    },
    monsters: {
      disturbing: makeMonster('slitherFish',{target: 'disturbed'}),
      alsoDisturbing: makeMonster('megaRat',{target: 'disturbed'}),
      notDisturbing: makeMonster('ghoulTroll'),
      dead: makeMonster('manAtArms',{killedBy: 'someHero', target: 'disturbed'}),
      escaped: makeMonster('slimeCorpse',{escaped: true})
    }
  };

  t.plan(2);

  let result = find_targets_for_hero(battle, {heroId: 'disturbed'});
  t.deepEqual(result, ['disturbing','alsoDisturbing'], 'disturbed hero can choose between those attacking her');

  result = find_targets_for_hero(battle, {heroId: 'undisturbed'});
  t.deepEqual(result, ['disturbing','alsoDisturbing','notDisturbing'], 'undisturbed hero can pick whoever');
});