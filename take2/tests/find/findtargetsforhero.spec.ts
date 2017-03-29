import * as test from "tape";
import { makeHero, makeMonster } from '../testutils';
import { BattleState } from '../../src/interfaces';
import { find_targets_for_hero } from '../../src/find/find_targets_for_hero';

test('find targets for hero', t => {
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

  t.deepEqual(
    find_targets_for_hero(battle, {heroId: 'disturbed'}),
    ['disturbing','alsoDisturbing'],
    'disturbed hero can choose between those attacking her'
  );

  t.deepEqual(
    find_targets_for_hero(battle, {heroId: 'undisturbed'}),
    ['disturbing','alsoDisturbing','notDisturbing'],
    'undisturbed hero can pick whoever'
  );

  t.end();

});