
import {MonsterState, MonsterTraitName} from '../interfaces';

import {monsters} from '../library';

export const isMonsterAlive = (monster: MonsterState) => !monster.vars.killedBy;

export const monsterHasTrait = (monster: MonsterState, trait: MonsterTraitName) => monsters[monster.blueprint].traits[trait];