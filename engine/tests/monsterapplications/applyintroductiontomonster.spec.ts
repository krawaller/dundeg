import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster } from '../testutils';
import { monsters } from '../../src/library'
import { BattleState, LogMessagePart } from '../../src/interfaces';
import { apply_introduction_to_monster } from '../../src/apply/apply_introduction_to_monster';

test('the apply introduction to monster method', t => {
  let battle: BattleState = {
    monsters: { firstRat: makeMonster('megaRat') },
    heroes: {},
    log: []
  };

  battle = apply_introduction_to_monster(battle, {monsterId: 'newRat', monsterType: 'megaRat'});
  t.ok(battle.monsters.newRat, 'new rat was added in correct position');
  t.equal(battle.monsters.newRat.name, monsters.megaRat.name+' #2', '2nd rat got correct name');
  t.equal(battle.monsters.newRat.vars.HP, monsters.megaRat.stats.HP, 'HP was correctly initialised');

  battle = apply_introduction_to_monster(battle, {monsterId: 'anotherRat', monsterType: 'megaRat'});
  t.equal(battle.monsters.anotherRat.name, monsters.megaRat.name+' #3', '3rd rat got correct name');

  battle = apply_introduction_to_monster(battle, {monsterId: 'nonRat', monsterType: 'slimeCorpse'});
  t.equal(battle.monsters.nonRat.name, monsters.slimeCorpse.name, 'First of its kind gets neutral name');

  t.end();
});