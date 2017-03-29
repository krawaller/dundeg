
import {MonsterState, MonsterTraitName, BattleState, HeroState} from '../interfaces';

import {monsters} from '../library';

export const isMonsterAlive = (monster: MonsterState) => !monster.vars.killedBy && !monster.vars.escaped;

export const monsterHasTrait = (monster: MonsterState, trait: MonsterTraitName) => monsters[monster.blueprint].traits[trait];

export const deepCopy = (obj: BattleState): BattleState => JSON.parse(JSON.stringify(obj));

export const isHeroAlive = (hero: HeroState) => !hero.vars.escaped && !hero.vars.knockedOutBy;
