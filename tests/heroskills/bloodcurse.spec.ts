import * as test from "tape";
import { lastLogHasStr, makeHero, makeMonster, execUntil, makeRoll, reply } from '../testutils';
import { BattleState, LogMessagePart, FlowInstruction } from '../../src/interfaces';
import { apply_wounds_to_hero } from '../../src/apply/apply_wounds_to_hero';
import { apply_blood_curse_invocation_result } from '../../src/apply/apply_blood_curse_invocation_result';
import { find_hero_actions } from '../../src/find/find_hero_actions';
import { heroSkills } from '../../src/library';

test('blood curse hero skill', t => {
  let battle: BattleState = {
    heroes: {
      curseLinkedHero: makeHero('bloodsportBrawler',{HP: 5, stance: 'defence'},{},{bloodCurse:true}),
      anotherHero: makeHero('infamousButcher',{HP: 7})
    },
    monsters: {
      cursedMonster: makeMonster('slitherFish',{HP:3}),
      nextMonster: makeMonster('manAtArms',{HP:5}),
      thirdMonster: makeMonster('manAtArms')
    },
    log: [],
    seed: 'bloodcursetest' // 4 6 3 1
  };

  t.ok(
    !find_hero_actions(battle,{heroId:'curseLinkedHero'})[heroSkills.bloodCurse.actions.castBloodCurse],
    'bloodcurse not available in defence stance'
  );

  let action:FlowInstruction = ['flow','bloodCurse',{heroId:'curseLinkedHero'}];

  battle.heroes.curseLinkedHero.vars.stance = 'assault';
  t.deepEqual(
    find_hero_actions(battle,{heroId:'curseLinkedHero'})[heroSkills.bloodCurse.actions.castBloodCurse],
    action,
    'bloodcurse available in assault mode'
  );

  battle = execUntil(battle, action); // initiate throw blood curse
  battle = reply(battle, 'slitherFish'); // pick target
  battle = reply(battle, makeRoll); // roll dice, gonna fail because 4+6 > 5
  t.ok(!battle.heroes.curseLinkedHero.vars.bloodCurseLink, 'blood curse was not added since invocation failed');
  t.ok(lastLogHasStr(battle, 'fail'), 'msg acknowledges the fail');

  battle = execUntil(battle, action); // initiate throw blood curse
  battle = reply(battle, 'slitherFish'); // pick target
  battle = reply(battle, makeRoll); // roll dice, gonna succeed because 3+1 < 5
  t.equal(battle.heroes.curseLinkedHero.vars.bloodCurseLink, 'cursedMonster', 'blood curse link set correctly');
  t.equal(battle.monsters.cursedMonster.states.bloodCurse, 'curseLinkedHero', 'blood curse state added to monster');
  t.ok(lastLogHasStr(battle, 'lood curse'), 'msg acknowledges the successful');

  battle = apply_wounds_to_hero(battle, {
    heroId: 'curseLinkedHero',
    monsterId: 'thirdMonster',
    wounds: {value: 2, history: []}
  });
  t.equal(battle.heroes.curseLinkedHero.vars.HP, 3, 'hero took damage as normal');
  t.equal(battle.monsters.cursedMonster.vars.HP, 1, 'cursed monster took same damage');
  t.ok(lastLogHasStr(battle, 'lood curse'), 'msg acknowledges the curse');

  battle = apply_wounds_to_hero(battle, {
    heroId: 'curseLinkedHero',
    monsterId: 'thirdMonster',
    wounds: {value: 2, history: []}
  });
  t.equal(battle.heroes.curseLinkedHero.vars.HP, 1, 'hero took damage as normal');
  t.equal(battle.monsters.cursedMonster.vars.HP, 0, 'monster was knocked out by curse');
  t.ok(!battle.heroes.curseLinkedHero.vars.bloodCurseLink, 'blood curse link was removed');
  t.ok(!battle.monsters.cursedMonster.states.bloodCurse, 'blood curse state was removed from monster');
  t.ok(lastLogHasStr(battle, 'lifted'), 'msg says curse was lifted');

  battle.heroes.curseLinkedHero.vars.bloodCurseLink = 'nextMonster';
  battle.monsters.nextMonster.states.bloodCurse = 'curseLinkedHero';
  battle = apply_wounds_to_hero(battle, {
    heroId: 'curseLinkedHero',
    monsterId: 'thirdMonster',
    wounds: {value: 2, history: []}
  });
  t.equal(battle.heroes.curseLinkedHero.vars.HP, 0, 'hero was knocked out as he should have been');
  t.equal(battle.monsters.nextMonster.vars.HP, 4, 'cursed monster only took 1 HP, since that is what was left for hero');

  t.end();
});

