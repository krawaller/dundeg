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
      curseLinkedHero: makeHero('bloodsportBrawler',{HP: 9, failedDefence: true},{},{bloodCurse:true}),
      anotherHero: makeHero('infamousButcher',{HP: 7})
    },
    monsters: {
      cursedMonster: makeMonster('slitherFish',{HP:5,target:'curseLinkedHero'}),
      nextMonster: makeMonster('imperialHuntsman',{HP:5,target:'curseLinkedHero'}), // ATK 4
      thirdMonster: makeMonster('imperialHuntsman',{target:'curseLinkedHero'}) // ATK 4
    },
    log: [],
    seed: 'bloodcursetest' // 4 6 3 1
  };

  battle.heroes.curseLinkedHero.vars.stance = 'defence';
  t.ok(
    !find_hero_actions(battle,{heroId:'curseLinkedHero'})[heroSkills.bloodCurse.actions.castBloodCurse],
    'bloodcurse not available in defence stance'
  );

  // ---------------- TEST THROWING

  battle.heroes.curseLinkedHero.vars.stance = 'assault';
  battle = execUntil(battle, ['flow','selectAction',{heroId:'curseLinkedHero'}]);
  battle = reply(battle, heroSkills.bloodCurse.actions.castBloodCurse);
  battle = reply(battle, battle.monsters.cursedMonster.name);

  battle = execUntil(battle, ['flow','executeAction',{heroId:'curseLinkedHero'}]); // initiate throw blood curse
  battle = reply(battle, makeRoll); // roll dice, gonna fail because 4+6 > 5
  t.ok(!battle.heroes.curseLinkedHero.vars.bloodCurseLink, 'blood curse was not added since invocation failed');
  t.ok(lastLogHasStr(battle, 'fail'), 'msg acknowledges the fail');

  battle = execUntil(battle, ['flow','executeAction',{heroId:'curseLinkedHero'}]); // initiate throw blood curse
  battle = reply(battle, makeRoll); // roll dice, gonna succeed because 3+1 < 5
  t.equal(battle.heroes.curseLinkedHero.vars.bloodCurseLink, 'cursedMonster', 'blood curse link set correctly');
  t.equal(battle.monsters.cursedMonster.states.bloodCurse, 'curseLinkedHero', 'blood curse state added to monster');
  t.ok(lastLogHasStr(battle, 'lood curse'), 'msg acknowledges the successful');

  // ---------------- TEST EFFECT
  
  battle = execUntil(battle, ['flow','performMonsterAttack',{monsterId:'thirdMonster'}]); // will do 4 DMG to hero
  t.equal(battle.heroes.curseLinkedHero.vars.HP, 5, 'hero HP is now 9-4=5');
  t.equal(battle.monsters.cursedMonster.vars.HP, 1, 'cursed monster took same damage (5-4=1)');
  t.ok(lastLogHasStr(battle, 'lood curse'), 'msg acknowledges the curse');

  battle = execUntil(battle, ['flow','performMonsterAttack',{monsterId:'thirdMonster'}]); // will knock monster out
  t.equal(battle.heroes.curseLinkedHero.vars.HP, 1, 'hero HP is now 5-4=1');
  t.equal(battle.monsters.cursedMonster.vars.HP, 0, 'monster was knocked out by curse');
  t.ok(!battle.monsters.cursedMonster.states.bloodCurse, 'blood curse state was removed from monster');
  t.ok(lastLogHasStr(battle, 'lifted'), 'msg says curse was lifted');

  battle.heroes.curseLinkedHero.vars.bloodCurseLink = 'nextMonster';
  battle.monsters.nextMonster.states.bloodCurse = 'curseLinkedHero';
  battle = execUntil(battle, ['flow','performMonsterAttack',{monsterId:'thirdMonster'}]); // will knock hero out
  t.equal(battle.heroes.curseLinkedHero.vars.HP, 0, 'hero was knocked out as he should have been');
  t.equal(battle.monsters.nextMonster.vars.HP, 4, 'cursed monster only took 1 HP, since that is what was left for hero');

  t.end();
});

