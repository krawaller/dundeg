import { BattleState, HeroId, HeroStance } from '../interfaces'
import { deepCopy, addLog } from '../utils/helpers'
import { apply_dice_removal } from './apply_dice_removal'

export interface EscapeOutcomeSpec {
  heroId: HeroId
}

export function apply_escape_outcome_to_hero(
  battle: BattleState,
  { heroId }: EscapeOutcomeSpec
): BattleState {
  let ret: BattleState = deepCopy(battle)
  ret = apply_dice_removal(ret, {
    heroId: heroId,
    diceType: { attack: true, power: true, defence: true },
  }) // TODO - really?
  ret.heroes[heroId].vars.escaped = true
  ret = addLog(ret, [{ heroRef: heroId }, 'manages to escape the battle!'])
  return ret
}
