import { BattleState, MonsterId, FlowInstruction, HeroStatName, LogMessageLine, FlowTarget } from '../interfaces';
import { find_party_stat } from '../find/find_party_stat';
import { monsters, heroes } from '../library';
import { isHeroAlive } from '../utils/helpers';

export interface MonsterTargetChoiceSpec {
  monsterId: MonsterId
}

export function flow_monster_target_choice(battle: BattleState, {monsterId}:MonsterTargetChoiceSpec): FlowInstruction {
  let monster = battle.monsters[monsterId];
  if (isHeroAlive(battle.heroes[monster.vars.target])){
    return undefined;
  }
  let blueprint = monsters[monster.blueprint];
  let stat = <HeroStatName>blueprint.targets.substr(0,3);
  let high = (blueprint.targets[3] === '+');
  let party = find_party_stat(battle, {stat, reason: 'monsterTargetAcquisition', monsterId});
  let prospects = party.ordered[( high ? 0 : party.ordered.length-1 )];
  if (prospects.heroes.length === 1){
    return ['apply', 'monsterTargetChoice', {monsterId, heroId: prospects.heroes[0], calculation: party.individual[prospects.heroes[0]]}];
  } else {
    let line = <LogMessageLine>[{monsterRef:monsterId},'goes after '+blueprint.targets+'.'];
    let opts = {};
    prospects.heroes.forEach(heroId=>{
      line = line.concat( [{heroRef: heroId}, 'has', party.individual[heroId], '. '] );
      opts[ heroes[battle.heroes[heroId].blueprint].name ] = <FlowTarget>['apply', 'monsterTargetChoice', {
        monsterId: monsterId,
        heroId: heroId,
        calculation: party.individual[heroId]
      }];
    });
    return ['ask',{
      line: line,
      options: opts
    }];
  }
}
