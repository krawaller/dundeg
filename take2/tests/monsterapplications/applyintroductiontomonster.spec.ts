import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';
import { monsters } from '../../src/library'
import { BattleState, LogMessagePart } from '../../src/interfaces';
import { apply_introduction_to_monster } from '../../src/apply/apply_introduction_to_monster';

test('the apply introduction to monster method', t => {
  const battle = {
    monsters: {
      firstRat: makeMonster('megaRat')
    },
    heroes: {},
    log: []
  }

  t.plan(5);

  let result = apply_introduction_to_monster(battle, {monsterId: 'newRat', monsterType: 'megaRat'});
  t.ok(result.monsters.newRat, 'new rat was added in correct position');
  t.equal(result.monsters.newRat.name, monsters.megaRat.name+' #2', '2nd rat got correct name');
  t.equal(result.monsters.newRat.vars.HP, monsters.megaRat.stats.HP, 'HP was correctly initialised');

  result = apply_introduction_to_monster(result, {monsterId: 'anotherRat', monsterType: 'megaRat'});
  t.equal(result.monsters.anotherRat.name, monsters.megaRat.name+' #3', '3rd rat got correct name');

  result = apply_introduction_to_monster(result, {monsterId: 'nonRat', monsterType: 'slimeCorpse'});
  t.equal(result.monsters.nonRat.name, monsters.slimeCorpse.name, 'First of its kind gets neutral name');
});