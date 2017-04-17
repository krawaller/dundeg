import { BattleState, HeroId, FlowTarget, FlowInstruction, LogMessage, Question, ApplyQuestion } from '../interfaces';
import { monsters } from '../library';
import { find_monsters } from '../find/find_monsters';
import { calculate_hero_stat } from '../calculate/calculate_hero_stat';

export interface HeroOfferEscapeChoiceSpec {
  heroId: HeroId
}

export function flow_hero_offer_escape_choice(battle: BattleState, {heroId}:HeroOfferEscapeChoiceSpec): FlowInstruction {
  let hero = battle.heroes[heroId];
  if (hero.vars.knockedOutBy){
    return;
  }
  let dice = hero.vars.defenceDice;
  if (dice[0] !== dice[1]){
    return <FlowInstruction>['apply','log', <LogMessage>{
      line: [{heroRef:heroId},'didnt roll doubles for defence and thus cannot escape.'],
      type: 'verbose'
    }];
  }
  let pursuers = find_monsters(battle,{}).filter(monsterId => {
    let monster = battle.monsters[monsterId];
    let blueprint = monsters[monster.blueprint];
    return monster.vars.target === heroId && blueprint.skills.pursue;
  });
  if (pursuers.length && !hero.items.nightCloak){
    return <FlowInstruction>['apply','log', <LogMessage>{
      line: [{heroRef:heroId},'cannot escape since', {monsterRef:pursuers[0]},'has Pursue'],
      type: 'verbose'
    }];
  }

  function makeStatOpt(stat):FlowTarget{
    return <FlowInstruction>['flow','test',{
      heroId: heroId,
      reason: 'escape',
      stat: stat,
      dice: 'defence',
      line: [
        {heroRef: heroId}, 'tests against '+stat+' of',
        calculate_hero_stat(battle, {heroId: heroId, stat: stat, reason: 'escape'}),
        'to escape battle'
      ],
      success: ['apply', 'escapeOutcome', {heroId: heroId}],
      failure: ['apply', 'escapeOutcome', {heroId: heroId}]
    }]
  }

  let options = { 'escape (PER)': makeStatOpt('PER') };
  let line = [{heroRef: heroId}, 'rolled doubles for defence and may try to escape'];
  if (hero.items.nightCloak){
    line = [{heroRef: heroId}, 'has Night Cloak and may try to escape using PER or MAG (and Pursue has no effect)'];
    options['escape (MAG)'] = makeStatOpt('MAG');
  }
  options['remain'] = undefined;

  return <ApplyQuestion>['apply','question', { line: line, options: options }];

}
