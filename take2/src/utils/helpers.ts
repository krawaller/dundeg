
import {MonsterState, MonsterTraitName} from '../interfaces';

import {monsters} from '../library';

export const isMonsterAlive = (monster: MonsterState) => !monster.vars.killedBy;

export const monsterHasTrait = (monster: MonsterState, trait: MonsterTraitName) => monsters[monster.blueprint].traits[trait];

export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj));