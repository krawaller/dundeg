
import {MonsterState, MonsterTraitName, BattleState} from '../interfaces';

import {monsters} from '../library';

export const isMonsterAlive = (monster: MonsterState) => !monster.vars.killedBy && !monster.vars.escaped;

export const monsterHasTrait = (monster: MonsterState, trait: MonsterTraitName) => monsters[monster.blueprint].traits[trait];

export const deepCopy = (obj: BattleState): BattleState => JSON.parse(JSON.stringify(obj));